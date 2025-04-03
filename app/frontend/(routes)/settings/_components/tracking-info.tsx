import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from 'lucide-react'

interface Stage {
  name: string
  completed: boolean
  date: string | null
}

interface TrackingData {
  orderNumber: string
  status: string
  estimatedDelivery: string
  stages: Stage[]
}

interface TrackingInfoProps {
  data: TrackingData
}

export function TrackingInfo({ data }: TrackingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order #{data.orderNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge variant="outline" className="mt-1">{data.status}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Estimated Delivery</p>
              <p className="mt-1">{data.estimatedDelivery}</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded-full" />
            <div 
              className="absolute left-0 top-0 h-1 bg-green-500 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(data.stages.filter(stage => stage.completed).length / data.stages.length) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {data.stages.map((stage, index) => (
                <div key={stage.name} className="flex flex-col items-center">
                  {stage.completed ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300" />
                  )}
                  <p className="mt-2 text-sm font-medium">{stage.name}</p>
                  {stage.date && (
                    <p className="mt-1 text-xs text-gray-500">{stage.date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

