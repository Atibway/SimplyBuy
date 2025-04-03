import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [cardNumber, setCardNumber] = useState('**** **** **** 1234')
  const [expiryDate, setExpiryDate] = useState('12/25')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment method update
    console.log('Updated payment method:', { paymentMethod, cardNumber, expiryDate })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit-card" id="credit-card" />
          <Label htmlFor="credit-card">Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
      </RadioGroup>

      {paymentMethod === 'credit-card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input
              id="expiry-date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
        </div>
      )}

      <Button type="submit">Update Payment Method</Button>
    </form>
  )
}

