import { supabase } from "./supabase";

interface CreateCustomerParams {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  city: string;
}

interface CreatePaymentParams {
  customerId: string;
  billingType: "CREDIT_CARD" | "BOLETO" | "PIX";
  value: number;
  dueDate: string;
  description: string;
  creditCard?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpf: string;
    postalCode: string;
    addressNumber: string;
    phone: string;
  };
  installmentCount?: number;
}

export async function createCustomer(params: CreateCustomerParams) {
  try {
    const { data, error } = await supabase.functions.invoke("process-payment", {
      body: {
        customer_name: params.name,
        customer_cpf: params.cpf.replace(/\D/g, ""),
        customer_email: params.email,
        customer_phone: params.phone.replace(/\D/g, ""),
        amount: 299.9,
      },
    });

    if (error) {
      console.error("Error in process-payment:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error in createCustomer:", err);
    throw err;
  }
}

export async function createPayment(params: CreatePaymentParams) {
  try {
    const { data, error } = await supabase.functions.invoke("asaas-proxy", {
      body: {
        endpoint: "/payments",
        data: {
          customer: params.customerId,
          billingType: params.billingType,
          value: params.value,
          dueDate: params.dueDate,
          description: params.description,
          ...(params.creditCard && { creditCard: params.creditCard }),
          ...(params.creditCardHolderInfo && {
            creditCardHolderInfo: params.creditCardHolderInfo,
          }),
          ...(params.installmentCount && {
            installmentCount: params.installmentCount,
          }),
        },
      },
    });

    if (error) {
      console.error("Error in asaas-proxy:", error);
      throw error;
    }

    return data || { id: `pmt_${Date.now()}` };
  } catch (err) {
    console.error("Error in createPayment:", err);
    // Fallback for development
    return { id: `pmt_${Date.now()}` };
  }
}
