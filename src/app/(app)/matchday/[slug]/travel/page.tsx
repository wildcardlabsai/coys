'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Train,
  TrainFront,
  Bus,
  Car,
  ParkingCircle,
  Footprints,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Clock,
  Navigation,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const venueTransport: Record<string, {
  name: string;
  address: string;
  lat: number;
  lng: number;
  options: Array<{
    type: string;
    icon: typeof Train;
    name: string;
    description: string;
    distance?: string;
    walkingTime?: string;
    details?: string[];
    color: string;
  }>;
}> = {
  'tottenham-hotspur-stadium': {
    name: 'Tottenham Hotspur Stadium',
    address: '782 High Road, London N17 0BX',
    lat: 51.6043,
    lng: -0.0655,
    options: [
      {
        type: 'rail',
        icon: Train,
        name: 'White Hart Lane',
        description: 'Closest station to the stadium. Greater Anglia services from Liverpool Street.',
        distance: '0.4 miles',
        walkingTime: '8 min walk',
        details: ['Overground from Liverpool Street', 'Frequent services on matchday', 'Can be busy after the match'],
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      },
      {
        type: 'rail',
        icon: TrainFront,
        name: 'Northumberland Park',
        description: 'Alternative station with good connections. Greater Anglia services.',
        distance: '0.6 miles',
        walkingTime: '12 min walk',
        details: ['Services from Liverpool Street', 'Less crowded alternative', 'Regular service'],
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      },
      {
        type: 'tube',
        icon: TrainFront,
        name: 'Seven Sisters',
        description: 'Victoria line tube station. Walk or bus to the ground.',
        distance: '0.9 miles',
        walkingTime: '15 min walk',
        details: ['Victoria line', 'Bus connections available', 'Longer walk but easy tube access'],
        color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      },
      {
        type: 'tube',
        icon: TrainFront,
        name: 'Tottenham Hale',
        description: 'Victoria line and National Rail interchange.',
        distance: '1.0 miles',
        walkingTime: '18 min walk',
        details: ['Victoria line', 'National Rail connections', 'Stansted Express'],
        color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      },
      {
        type: 'bus',
        icon: Bus,
        name: 'Bus Routes',
        description: 'Multiple bus routes serve the area around the stadium.',
        details: ['149 – Liverpool Street to Edmonton Green', '259 – King\'s Cross to Edmonton Green', '279 – Manor House to Waltham Cross', '349 – Stamford Hill to Ponders End'],
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      },
      {
        type: 'car',
        icon: Car,
        name: 'Driving',
        description: 'Limited parking near the stadium. A CPZ is in operation on matchdays.',
        details: ['A10 from central London', 'Controlled Parking Zone on matchdays', 'Consider park and ride options', 'Allow extra time for traffic'],
        color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
      },
      {
        type: 'parking',
        icon: ParkingCircle,
        name: 'Parking',
        description: 'Pre-booked parking is recommended. Street parking is restricted.',
        details: ['Official stadium parking must be pre-booked', 'Controlled Parking Zone in effect', 'Park & Ride from Tottenham Hale', 'JustPark for nearby spaces'],
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      },
      {
        type: 'walking',
        icon: Footprints,
        name: 'Walking Directions',
        description: 'From White Hart Lane station, walk along the High Road towards the stadium.',
        walkingTime: '8 min from White Hart Lane',
        details: ['Follow the crowds on matchday', 'Stadium is visible from the High Road', 'Well-signposted routes'],
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      },
    ],
  },
};

const defaultTransport = {
  name: 'Stadium',
  address: '',
  lat: 51.5,
  lng: -0.1,
  options: [
    { type: 'rail', icon: Train, name: 'Train', description: 'Check National Rail for services.', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    { type: 'bus', icon: Bus, name: 'Bus', description: 'Local bus services available.', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
    { type: 'car', icon: Car, name: 'Driving', description: 'Check for matchday parking restrictions.', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300' },
  ],
};

export default function TravelPage() {
  const params = useParams();
  const slug = params.slug as string;

  const transport = venueTransport['tottenham-hotspur-stadium'] || defaultTransport;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/matchday/${slug}`}
          className="p-2 rounded-lg hover:bg-card-bg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Getting There</h1>
          <p className="text-sm text-muted">{transport.name}</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#132257]/10 dark:bg-[#132257]/30">
              <MapPin className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{transport.name}</p>
              <p className="text-sm text-muted mt-0.5">{transport.address}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${transport.lat},${transport.lng}`,
                  '_blank'
                );
              }}
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${transport.lat},${transport.lng}`,
                  '_blank'
                );
              }}
            >
              <ExternalLink className="h-4 w-4" />
              Open Map
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {transport.options.map((option, index) => (
          <Card key={index} className="card-interactive">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn('p-2.5 rounded-xl', option.color)}>
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{option.name}</h3>
                    {option.distance && (
                      <Badge variant="secondary" className="text-xs">
                        {option.distance}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted mt-1">{option.description}</p>
                  {option.walkingTime && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted">
                      <Clock className="h-3 w-3" />
                      {option.walkingTime}
                    </div>
                  )}
                  {option.details && option.details.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {option.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                          <span className="w-1 h-1 rounded-full bg-muted-light mt-2 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted">
            Transport information is for general guidance. Check services before travelling.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => window.open('https://tfl.gov.uk', '_blank')}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Check TfL Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
