import { Lead } from '../leads/_components/leadsTable';

// Mock leads data based on the actual form schema
export const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'PENDING',
    country: 'United States'
  },
  {
    id: 2,
    name: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    createdAt: '2024-01-14T14:20:00Z',
    status: 'REACHED_OUT',
    country: 'Canada'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    createdAt: '2024-01-13T09:15:00Z',
    status: 'PENDING',
    country: 'United Kingdom'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    createdAt: '2024-01-12T16:45:00Z',
    status: 'REACHED_OUT',
    country: 'Australia'
  },
  {
    id: 5,
    name: 'David Brown',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    createdAt: '2024-01-11T11:30:00Z',
    status: 'PENDING',
    country: 'Germany'
  },
  {
    id: 6,
    name: 'Emily Chen',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@example.com',
    createdAt: '2024-01-10T08:45:00Z',
    status: 'REACHED_OUT',
    country: 'Singapore'
  },
  {
    id: 7,
    name: 'Carlos Rodriguez',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    email: 'carlos.rodriguez@example.com',
    createdAt: '2024-01-09T13:20:00Z',
    status: 'PENDING',
    country: 'Spain'
  },
  {
    id: 8,
    name: 'Priya Patel',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    createdAt: '2024-01-08T15:10:00Z',
    status: 'REACHED_OUT',
    country: 'India'
  },
  {
    id: 9,
    name: 'Alexander Müller',
    firstName: 'Alexander',
    lastName: 'Müller',
    email: 'alexander.muller@example.com',
    createdAt: '2024-01-07T12:00:00Z',
    status: 'PENDING',
    country: 'Austria'
  },
  {
    id: 10,
    name: 'Maria Santos',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@example.com',
    createdAt: '2024-01-06T09:30:00Z',
    status: 'REACHED_OUT',
    country: 'Brazil'
  },
  {
    id: 11,
    name: 'Kevin Lee',
    firstName: 'Kevin',
    lastName: 'Lee',
    email: 'kevin.lee@example.com',
    createdAt: '2024-01-05T14:15:00Z',
    status: 'PENDING',
    country: 'South Korea'
  },
  {
    id: 12,
    name: 'Sophie Dubois',
    firstName: 'Sophie',
    lastName: 'Dubois',
    email: 'sophie.dubois@example.com',
    createdAt: '2024-01-04T11:45:00Z',
    status: 'REACHED_OUT',
    country: 'France'
  },
  {
    id: 13,
    name: 'Ahmed Hassan',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    createdAt: '2024-01-03T16:20:00Z',
    status: 'PENDING',
    country: 'Egypt'
  },
  {
    id: 14,
    name: 'Lisa Anderson',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@example.com',
    createdAt: '2024-01-02T10:00:00Z',
    status: 'REACHED_OUT',
    country: 'Sweden'
  },
  {
    id: 15,
    name: 'Roberto Silva',
    firstName: 'Roberto',
    lastName: 'Silva',
    email: 'roberto.silva@example.com',
    createdAt: '2024-01-01T13:30:00Z',
    status: 'PENDING',
    country: 'Mexico'
  },
  {
    id: 16,
    name: 'Yuki Tanaka',
    firstName: 'Yuki',
    lastName: 'Tanaka',
    email: 'yuki.tanaka@example.com',
    createdAt: '2023-12-31T15:45:00Z',
    status: 'REACHED_OUT',
    country: 'Japan'
  },
  {
    id: 17,
    name: 'Oliver Thompson',
    firstName: 'Oliver',
    lastName: 'Thompson',
    email: 'oliver.thompson@example.com',
    createdAt: '2023-12-30T09:15:00Z',
    status: 'PENDING',
    country: 'New Zealand'
  },
  {
    id: 18,
    name: 'Anna Kowalski',
    firstName: 'Anna',
    lastName: 'Kowalski',
    email: 'anna.kowalski@example.com',
    createdAt: '2023-12-29T12:20:00Z',
    status: 'REACHED_OUT',
    country: 'Poland'
  },
  {
    id: 19,
    name: 'James Wilson',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@example.com',
    createdAt: '2023-12-28T14:30:00Z',
    status: 'PENDING',
    country: 'Ireland'
  },
  {
    id: 20,
    name: 'Fatima Al-Zahra',
    firstName: 'Fatima',
    lastName: 'Al-Zahra',
    email: 'fatima.alzahra@example.com',
    createdAt: '2023-12-27T11:10:00Z',
    status: 'REACHED_OUT',
    country: 'Morocco'
  },
  {
    id: 21,
    name: 'Lucas Garcia',
    firstName: 'Lucas',
    lastName: 'Garcia',
    email: 'lucas.garcia@example.com',
    createdAt: '2023-12-26T16:00:00Z',
    status: 'PENDING',
    country: 'Argentina'
  },
  {
    id: 22,
    name: 'Nina Petrov',
    firstName: 'Nina',
    lastName: 'Petrov',
    email: 'nina.petrov@example.com',
    createdAt: '2023-12-25T08:30:00Z',
    status: 'REACHED_OUT',
    country: 'Russia'
  },
  {
    id: 23,
    name: 'Raj Sharma',
    firstName: 'Raj',
    lastName: 'Sharma',
    email: 'raj.sharma@example.com',
    createdAt: '2023-12-24T13:45:00Z',
    status: 'PENDING',
    country: 'Nepal'
  },
  {
    id: 24,
    name: 'Isabella Romano',
    firstName: 'Isabella',
    lastName: 'Romano',
    email: 'isabella.romano@example.com',
    createdAt: '2023-12-23T10:20:00Z',
    status: 'REACHED_OUT',
    country: 'Italy'
  },
  {
    id: 25,
    name: 'Chen Wei',
    firstName: 'Chen',
    lastName: 'Wei',
    email: 'chen.wei@example.com',
    createdAt: '2023-12-22T15:15:00Z',
    status: 'PENDING',
    country: 'China'
  }
]; 