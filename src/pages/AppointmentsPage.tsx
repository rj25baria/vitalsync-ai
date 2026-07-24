import { useState } from "react"
import {
  Box, Container, Flex, Heading, Text, Button, HStack, VStack,
  Badge, Card, SimpleGrid, Input, Separator
} from "@chakra-ui/react"
import {
  LuCalendarCheck, LuCalendarPlus, LuVideo, LuMapPin, LuClock,
  LuUser, LuStethoscope, LuCircleCheck, LuX, LuChevronLeft, LuChevronRight, LuStar
} from "react-icons/lu"

const doctors = [
  {
    id: 1, name: "Dr. Sarah Chen", specialty: "Primary Care", rating: 4.9, reviews: 142,
    nextAvailable: "Today", telehealth: true, inPerson: true,
    bio: "Board-certified family physician with 12 years of experience in preventive care and chronic disease management.",
    avatar: "SC",
    color: "teal",
  },
  {
    id: 2, name: "Dr. James Park", specialty: "Cardiology", rating: 4.8, reviews: 98,
    nextAvailable: "Tomorrow", telehealth: true, inPerson: true,
    bio: "Interventional cardiologist specializing in heart failure, arrhythmia, and preventive cardiology.",
    avatar: "JP",
    color: "red",
  },
  {
    id: 3, name: "Dr. Maria Santos", specialty: "Dermatology", rating: 4.7, reviews: 76,
    nextAvailable: "Jul 29", telehealth: true, inPerson: false,
    bio: "Dermatologist with expertise in medical and cosmetic dermatology, acne management, and skin cancer screening.",
    avatar: "MS",
    color: "purple",
  },
  {
    id: 4, name: "Dr. Ahmed Hassan", specialty: "Mental Health", rating: 4.9, reviews: 203,
    nextAvailable: "Jul 30", telehealth: true, inPerson: true,
    bio: "Psychiatrist specializing in anxiety, depression, ADHD, and trauma-informed care for adults and adolescents.",
    avatar: "AH",
    color: "blue",
  },
]

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM", "4:30 PM"]

const upcomingAppointments = [
  {
    id: 1, doctor: "Dr. Sarah Chen", specialty: "Primary Care", date: "Jul 28, 2025",
    time: "10:00 AM", type: "In-Person", status: "confirmed", color: "teal",
  },
  {
    id: 2, doctor: "Dr. James Park", specialty: "Cardiology", date: "Aug 5, 2025",
    time: "2:30 PM", type: "Telehealth", status: "confirmed", color: "red",
  },
]

const pastAppointments = [
  {
    id: 3, doctor: "Dr. Sarah Chen", specialty: "Primary Care", date: "Jun 14, 2025",
    time: "11:00 AM", type: "In-Person", status: "completed", notes: "Annual physical. All results normal.",
  },
]

type View = "list" | "book"

export default function AppointmentsPage() {
  const [view, setView] = useState<View>("list")
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [visitType, setVisitType] = useState<"telehealth" | "in-person" | "">("")
  const [reason, setReason] = useState("")
  const [booked, setBooked] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBook = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !visitType) return
    setBooked(true)
  }

  const resetBooking = () => {
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTime("")
    setVisitType("")
    setReason("")
    setBooked(false)
    setView("list")
  }

  return (
    <Container maxW="5xl" py="8" px={{ base: "4", md: "6" }}>
      <Flex justify="space-between" align="center" mb="8" gap="4" wrap="wrap">
        <VStack align="flex-start" gap="1">
          <Heading fontSize="2xl" fontWeight="bold">Appointments</Heading>
          <Text color="fg.muted" fontSize="sm">Manage and book appointments with your care team.</Text>
        </VStack>
        <Button
          colorPalette="teal"
          onClick={() => { setView("book"); setBooked(false) }}
        >
          <LuCalendarPlus /> Book Appointment
        </Button>
      </Flex>

      {/* Booking Flow */}
      {view === "book" && !booked && (
        <Box mb="8">
          <Button variant="ghost" size="sm" mb="4" onClick={() => setView("list")}>
            <LuChevronLeft /> Back to Appointments
          </Button>

          {!selectedDoctor ? (
            <Box>
              <Heading size="md" mb="2">Choose a Provider</Heading>
              <Text color="fg.muted" fontSize="sm" mb="5">Search by name or specialty</Text>

              <Box position="relative" mb="5">
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  pl="4"
                />
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                {filteredDoctors.map((doc) => (
                  <Card.Root
                    key={doc.id}
                    variant="outline"
                    cursor="pointer"
                    _hover={{ shadow: "md", borderColor: `${doc.color}.300` }}
                    transition="all 0.2s"
                    onClick={() => setSelectedDoctor(doc)}
                  >
                    <Card.Body>
                      <HStack gap="4" align="flex-start">
                        <Flex
                          w="12"
                          h="12"
                          rounded="full"
                          bg={`${doc.color}.100`}
                          _dark={{ bg: `${doc.color}.900/30` }}
                          align="center"
                          justify="center"
                          color={`${doc.color}.700`}
                          fontWeight="bold"
                          fontSize="sm"
                          flexShrink={0}
                        >
                          {doc.avatar}
                        </Flex>
                        <VStack align="flex-start" gap="1" flex="1">
                          <Text fontWeight="semibold">{doc.name}</Text>
                          <Badge colorPalette={doc.color} variant="subtle" size="sm">{doc.specialty}</Badge>
                          <HStack gap="1" color="yellow.400">
                            {[...Array(5)].map((_, i) => (
                              <LuStar key={i} size={12} fill={i < Math.floor(doc.rating) ? "currentColor" : "none"} />
                            ))}
                            <Text fontSize="xs" color="fg.muted">{doc.rating} ({doc.reviews})</Text>
                          </HStack>
                          <Text fontSize="xs" color="fg.muted" lineHeight="tall">{doc.bio}</Text>
                          <HStack gap="3" mt="1">
                            <HStack gap="1" color="fg.muted" fontSize="xs">
                              <LuClock size={12} />
                              <Text>Next: {doc.nextAvailable}</Text>
                            </HStack>
                            {doc.telehealth && (
                              <HStack gap="1" color="blue.500" fontSize="xs">
                                <LuVideo size={12} />
                                <Text>Telehealth</Text>
                              </HStack>
                            )}
                            {doc.inPerson && (
                              <HStack gap="1" color="teal.500" fontSize="xs">
                                <LuMapPin size={12} />
                                <Text>In-Person</Text>
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </Box>
          ) : (
            <Card.Root variant="outline">
              <Card.Body gap="6">
                {/* Selected Doctor */}
                <Flex gap="4" align="center" p="4" bg="bg.subtle" rounded="xl">
                  <Flex
                    w="12"
                    h="12"
                    rounded="full"
                    bg={`${selectedDoctor.color}.100`}
                    _dark={{ bg: `${selectedDoctor.color}.900/30` }}
                    align="center"
                    justify="center"
                    color={`${selectedDoctor.color}.700`}
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {selectedDoctor.avatar}
                  </Flex>
                  <VStack align="flex-start" gap="0.5" flex="1">
                    <Text fontWeight="semibold">{selectedDoctor.name}</Text>
                    <Text fontSize="sm" color="fg.muted">{selectedDoctor.specialty}</Text>
                  </VStack>
                  <Button size="xs" variant="ghost" onClick={() => setSelectedDoctor(null)}>
                    Change <LuChevronRight />
                  </Button>
                </Flex>

                {/* Visit Type */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb="3">Visit Type</Text>
                  <Flex gap="3">
                    {selectedDoctor.telehealth && (
                      <Box
                        flex="1"
                        p="4"
                        rounded="xl"
                        borderWidth="2px"
                        borderColor={visitType === "telehealth" ? "blue.400" : "border"}
                        bg={visitType === "telehealth" ? "blue.50" : "transparent"}
                        _dark={{ bg: visitType === "telehealth" ? "blue.900/20" : "transparent" }}
                        cursor="pointer"
                        textAlign="center"
                        onClick={() => setVisitType("telehealth")}
                        transition="all 0.2s"
                      >
                        <LuVideo size={24} color={visitType === "telehealth" ? "var(--chakra-colors-blue-500)" : "var(--chakra-colors-fg-muted)"} style={{ margin: "0 auto 8px" }} />
                        <Text fontWeight="semibold" fontSize="sm">Telehealth</Text>
                        <Text fontSize="xs" color="fg.muted">Video call</Text>
                      </Box>
                    )}
                    {selectedDoctor.inPerson && (
                      <Box
                        flex="1"
                        p="4"
                        rounded="xl"
                        borderWidth="2px"
                        borderColor={visitType === "in-person" ? "teal.400" : "border"}
                        bg={visitType === "in-person" ? "teal.50" : "transparent"}
                        _dark={{ bg: visitType === "in-person" ? "teal.900/20" : "transparent" }}
                        cursor="pointer"
                        textAlign="center"
                        onClick={() => setVisitType("in-person")}
                        transition="all 0.2s"
                      >
                        <LuMapPin size={24} color={visitType === "in-person" ? "var(--chakra-colors-teal-500)" : "var(--chakra-colors-fg-muted)"} style={{ margin: "0 auto 8px" }} />
                        <Text fontWeight="semibold" fontSize="sm">In-Person</Text>
                        <Text fontSize="xs" color="fg.muted">Clinic visit</Text>
                      </Box>
                    )}
                  </Flex>
                </Box>

                {/* Date */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb="2">Preferred Date</Text>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Box>

                {/* Time */}
                {selectedDate && (
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb="3">Available Time Slots</Text>
                    <SimpleGrid columns={5} gap="2">
                      {timeSlots.map((t) => (
                        <Button
                          key={t}
                          size="sm"
                          variant={selectedTime === t ? "solid" : "outline"}
                          colorPalette="teal"
                          onClick={() => setSelectedTime(t)}
                          fontSize="xs"
                        >
                          {t}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                {/* Reason */}
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb="2">Reason for Visit</Text>
                  <Input
                    placeholder="e.g. Annual checkup, follow-up, new symptoms..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Box>

                <Button
                  colorPalette="teal"
                  size="lg"
                  w="full"
                  onClick={handleBook}
                  disabled={!selectedDate || !selectedTime || !visitType}
                >
                  <LuCalendarCheck /> Confirm Appointment
                </Button>
              </Card.Body>
            </Card.Root>
          )}
        </Box>
      )}

      {/* Booking Confirmation */}
      {view === "book" && booked && (
        <Card.Root variant="outline" borderColor="green.300" bg="green.50" _dark={{ bg: "green.900/20" }} mb="8">
          <Card.Body textAlign="center" py="10" gap="4">
            <Box color="green.500" mx="auto">
              <LuCircleCheck size={48} />
            </Box>
            <Heading size="lg" color="fg">Appointment Confirmed!</Heading>
            <VStack gap="1">
              <Text color="fg.muted">{selectedDoctor?.name} · {selectedDoctor?.specialty}</Text>
              <Text color="fg.muted">{selectedDate} at {selectedTime}</Text>
              <Badge colorPalette={visitType === "telehealth" ? "blue" : "teal"} size="md" px="4" py="1.5" rounded="full">
                {visitType === "telehealth" ? "Telehealth" : "In-Person"}
              </Badge>
            </VStack>
            <Text fontSize="sm" color="fg.muted">
              A confirmation has been sent to your email. You'll receive a reminder 24 hours before your appointment.
            </Text>
            <Button colorPalette="teal" onClick={resetBooking} mt="2">
              Back to Appointments
            </Button>
          </Card.Body>
        </Card.Root>
      )}

      {/* Upcoming Appointments */}
      {view === "list" && (
        <>
          <Box mb="8">
            <Heading size="md" mb="4">Upcoming Appointments</Heading>
            {upcomingAppointments.length === 0 ? (
              <Card.Root variant="outline">
                <Card.Body textAlign="center" py="10">
                  <LuCalendarCheck size={32} color="var(--chakra-colors-fg-muted)" style={{ margin: "0 auto 12px" }} />
                  <Text color="fg.muted">No upcoming appointments</Text>
                  <Button mt="4" colorPalette="teal" size="sm" onClick={() => setView("book")}>
                    Book an Appointment
                  </Button>
                </Card.Body>
              </Card.Root>
            ) : (
              <VStack gap="4">
                {upcomingAppointments.map((apt) => (
                  <Card.Root key={apt.id} variant="outline" w="full">
                    <Card.Body>
                      <Flex gap="4" align="flex-start" wrap="wrap">
                        <Flex
                          w="12"
                          h="12"
                          rounded="xl"
                          bg={`${apt.color}.100`}
                          _dark={{ bg: `${apt.color}.900/30` }}
                          align="center"
                          justify="center"
                          color={`${apt.color}.600`}
                          flexShrink={0}
                        >
                          <LuStethoscope size={20} />
                        </Flex>
                        <VStack align="flex-start" gap="1" flex="1">
                          <HStack justify="space-between" w="full" wrap="wrap" gap="2">
                            <Text fontWeight="semibold">{apt.doctor}</Text>
                            <Badge colorPalette="green" variant="subtle" size="sm">
                              <LuCircleCheck /> {apt.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="fg.muted">{apt.specialty}</Text>
                          <HStack gap="4" color="fg.muted" fontSize="sm">
                            <HStack gap="1">
                              <LuCalendarCheck size={14} />
                              <Text>{apt.date}</Text>
                            </HStack>
                            <HStack gap="1">
                              <LuClock size={14} />
                              <Text>{apt.time}</Text>
                            </HStack>
                          </HStack>
                          <Badge
                            colorPalette={apt.type === "Telehealth" ? "blue" : "teal"}
                            variant="subtle"
                            size="sm"
                          >
                            {apt.type === "Telehealth" ? <LuVideo /> : <LuMapPin />}
                            {apt.type}
                          </Badge>
                        </VStack>
                        <HStack gap="2">
                          <Button size="sm" variant="outline" colorPalette="teal">
                            {apt.type === "Telehealth" ? "Join Call" : "Get Directions"}
                          </Button>
                          <Button size="sm" variant="ghost" colorPalette="red">
                            <LuX /> Cancel
                          </Button>
                        </HStack>
                      </Flex>
                    </Card.Body>
                  </Card.Root>
                ))}
              </VStack>
            )}
          </Box>

          {/* Past Appointments */}
          <Box>
            <Heading size="md" mb="4">Past Appointments</Heading>
            <VStack gap="4">
              {pastAppointments.map((apt) => (
                <Card.Root key={apt.id} variant="outline" w="full" opacity={0.8}>
                  <Card.Body>
                    <Flex gap="4" align="flex-start" wrap="wrap">
                      <Flex
                        w="12"
                        h="12"
                        rounded="xl"
                        bg="bg.subtle"
                        align="center"
                        justify="center"
                        color="fg.muted"
                        flexShrink={0}
                      >
                        <LuUser size={20} />
                      </Flex>
                      <VStack align="flex-start" gap="1" flex="1">
                        <HStack justify="space-between" w="full" wrap="wrap" gap="2">
                          <Text fontWeight="semibold">{apt.doctor}</Text>
                          <Badge variant="outline" size="sm" colorPalette="gray">Completed</Badge>
                        </HStack>
                        <Text fontSize="sm" color="fg.muted">{apt.specialty}</Text>
                        <HStack gap="4" color="fg.muted" fontSize="sm">
                          <HStack gap="1">
                            <LuCalendarCheck size={14} />
                            <Text>{apt.date}</Text>
                          </HStack>
                          <HStack gap="1">
                            <LuClock size={14} />
                            <Text>{apt.time}</Text>
                          </HStack>
                        </HStack>
                        {apt.notes && (
                          <Box p="2" bg="bg.subtle" rounded="lg" w="full" mt="1">
                            <Text fontSize="xs" color="fg.muted">{apt.notes}</Text>
                          </Box>
                        )}
                      </VStack>
                      <Button size="sm" variant="outline">
                        Book Follow-up
                      </Button>
                    </Flex>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Box>
        </>
      )}
    </Container>
  )
}
