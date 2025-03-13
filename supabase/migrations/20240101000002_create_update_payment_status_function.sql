-- Create function to update payment status based on Asaas webhook events
CREATE OR REPLACE FUNCTION update_payment_status(asaas_id TEXT, event TEXT)
RETURNS VOID AS $$
BEGIN
  -- Update payment status based on event
  IF event = 'PAYMENT_CONFIRMED' OR event = 'PAYMENT_RECEIVED' THEN
    -- Update payment status to paid
    UPDATE payments SET status = 'paid', updated_at = NOW()
    WHERE asaas_id = asaas_id;
    
    -- Activate member and set expiry date to 1 year from now
    UPDATE members SET 
      active = TRUE, 
      membership_expiry = (NOW() + INTERVAL '1 year')::DATE,
      updated_at = NOW()
    WHERE id IN (SELECT member_id FROM payments WHERE asaas_id = asaas_id);
    
  ELSIF event = 'PAYMENT_OVERDUE' OR event = 'PAYMENT_DELETED' THEN
    -- Update payment status to failed
    UPDATE payments SET status = 'failed', updated_at = NOW()
    WHERE asaas_id = asaas_id;
    
  ELSIF event = 'PAYMENT_CREATED' OR event = 'PAYMENT_UPDATED' THEN
    -- Update payment status to pending
    UPDATE payments SET status = 'pending', updated_at = NOW()
    WHERE asaas_id = asaas_id;
  END IF;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
