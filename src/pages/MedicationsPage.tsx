import { useState } from "react"
import {
  Box, Container, Flex, Heading, Text, Button, HStack, VStack,
  Badge, Card, SimpleGrid, Input, Progress, Separator
} from "@chakra-ui/react"
import {
  LuPill, LuPillBottle, LuPlus, LuCheck, LuX, LuClock, LuCalendarCheck,
  LuTriangleAlert, LuBell, LuRefreshCw, LuInfo
} from "react-icons/lu"

interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  times: string[]
  taken: boolean[]
  purpose: string
  color: string
  refillDate: string
  pillsRemaining: number
  totalPills: number
  instructions: string
  prescriber: string
}

const initialMedications: Medication[] = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10 mg",
    frequency: "Once daily",
    times: ["8:00 AM"],
    taken: [true],
    purpose: "Blood pressure",
    color: "teal",
    refillDate: "Aug 15, 2025",
    pillsRemaining: 18,
    totalPills: 30,
    instructions: "Take with or without food. Avoid potassium supplements.",
    prescriber: "Dr. Sarah Chen",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    times: ["8:00 AM", "6:00 PM"],
    taken: [true, false],
    purpose: "Blood sugar",
    color: "blue",
    refillDate: "Aug 10, 2025",
    pillsRemaining: 24,
    totalPills: 60,
    instructions: "Take with meals to reduce stomach upset.",
    prescriber: "Dr. Sarah Chen",
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Once daily",
    times: ["9:00 PM"],
    taken: [false],
    purpose: "Cholesterol",
    color: "orange",
    refillDate: "Sep 1, 2025",
    pillsRemaining: 27,
    totalPills: 30,
    instructions: "Best taken in the evening. Report muscle pain immediately.",
    prescriber: "Dr. James Park",
  },
  {
    id: 4,
    name: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Once daily",
    times: ["8:00 AM"],
    taken: [true],
    purpose: "Supplement",
    color: "yellow",
    refillDate: "Oct 5, 2025",
    pillsRemaining: 45,
    totalPills: 90,
    instructions: "Take with a fatty meal for best absorption.",
    prescriber: "Self-managed",
  },
]

const interactions = [
  {
    drug1: "Lisinopril",
    drug2: "Metformin",
    severity: "low",
    note: "Monitor blood pressure and kidney function when combining these medications.",
  },
]

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications)
  const [activeTab, setActiveTab] = useState<"today" | "all" | "interactions">("today")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleTaken = (medId: number, doseIndex: number) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id !== medId) return m
        const newTaken = [...m.taken]
        newTaken[doseIndex] = !newTaken[doseIndex]
        return { ...m, taken: newTaken }
      })
    )
  }

  const totalDoses = medications.reduce((sum, m) => sum + m.times.length, 0)
  const takenDoses = medications.reduce((sum, m) => sum + m.taken.filter(Boolean).length, 0)
  const adherencePercent = Math.round((takenDoses / totalDoses) * 100)

  const lowRefill = medications.filter((m) => m.pillsRemaining / m.totalPills < 0.3)

  return (
    <Container maxW="5xl" py="8" px={{ base: "4", md: "6" }}>
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb="8" gap="4" wrap="wrap">
        <VStack align="flex-start" gap="1">
          <Heading fontSize="2xl" fontWeight="bold">Medications</Heading>
          <Text color="fg.muted" fontSize="sm">Track your medications and stay on schedule.</Text>
        </VStack>
        <Button colorPalette="teal">
          <LuPlus /> Add Medication
        </Button>
      </Flex>

      {/* Today's adherence card */}
      <Card.Root variant="outline" mb="6" borderColor="teal.200">
        <Card.Body>
          <Flex gap="6" align="center" wrap="wrap">
            <VStack align="flex-start" gap="1" flex="1" minW="0">
              <HStack justify="space-between" w="full">
                <Text fontWeight="semibold" fontSize="sm">Today's Adherence</Text>
                <Badge
                  colorPalette={adherencePercent === 100 ? "green" : adherencePercent >= 50 ? "orange" : "red"}
                  variant="solid"
                  size="md"
                  rounded="full"
                >
                  {takenDoses}/{totalDoses} doses
                </Badge>
              </HStack>
              <Progress.Root value={adherencePercent} colorPalette="teal" size="sm" rounded="full" w="full">
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <Text fontSize="xs" color="fg.muted">
                {adherencePercent === 100
                  ? "All medications taken for today. Great job!"
                  : `${totalDoses - takenDoses} dose${totalDoses - takenDoses !== 1 ? "s" : ""} remaining today`}
              </Text>
            </VStack>

            <SimpleGrid columns={3} gap="4" flexShrink={0}>
              {[
                { label: "This Week", value: "92%", color: "green" },
                { label: "This Month", value: "87%", color: "teal" },
                { label: "Streak", value: "8 days", color: "blue" },
              ].map((stat) => (
                <VStack key={stat.label} gap="0" align="center">
                  <Text fontWeight="black" fontSize="xl" color={`${stat.color}.500`}>{stat.value}</Text>
                  <Text fontSize="xs" color="fg.muted">{stat.label}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Flex>
        </Card.Body>
      </Card.Root>

      {/* Low refill alerts */}
      {lowRefill.length > 0 && (
        <VStack gap="2" mb="6">
          {lowRefill.map((m) => (
            <Flex
              key={m.id}
              w="full"
              align="center"
              justify="space-between"
              gap="3"
              p="3"
              rounded="xl"
              borderWidth="1px"
              borderColor="orange.200"
              bg="orange.50"
              _dark={{ bg: "orange.900/20", borderColor: "orange.700" }}
            >
              <HStack gap="2">
                <Box color="orange.500">
                  <LuTriangleAlert size={16} />
                </Box>
                <Text fontSize="sm" color="fg">
                  <Text as="span" fontWeight="semibold">{m.name}</Text> is running low — {m.pillsRemaining} pills remaining.
                  Refill by {m.refillDate}.
                </Text>
              </HStack>
              <Button size="xs" colorPalette="orange" variant="outline" flexShrink={0}>
                <LuRefreshCw /> Request Refill
              </Button>
            </Flex>
          ))}
        </VStack>
      )}

      {/* Tabs */}
      <HStack gap="1" mb="6" bg="bg.subtle" p="1" rounded="xl" w="fit-content">
        {(["today", "all", "interactions"] as const).map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={activeTab === tab ? "solid" : "ghost"}
            colorPalette={activeTab === tab ? "teal" : "gray"}
            rounded="lg"
            textTransform="capitalize"
            onClick={() => setActiveTab(tab)}
          >
            {tab === "today" ? "Today's Schedule" : tab === "all" ? "All Medications" : "Interactions"}
          </Button>
        ))}
      </HStack>

      {/* Today's Schedule */}
      {activeTab === "today" && (
        <VStack gap="4">
          {["Morning", "Evening"].map((period) => {
            const periodMeds = medications.flatMap((m) =>
              m.times
                .map((time, i) => ({ med: m, time, index: i }))
                .filter(({ time }) => period === "Morning" ? time.includes("AM") : time.includes("PM"))
            )
            if (periodMeds.length === 0) return null
            return (
              <Box key={period} w="full">
                <HStack gap="2" mb="3">
                  <Box color="fg.muted"><LuClock size={16} /></Box>
                  <Text fontWeight="semibold" fontSize="sm" color="fg.muted">{period}</Text>
                </HStack>
                <VStack gap="3">
                  {periodMeds.map(({ med, time, index }) => {
                    const taken = med.taken[index]
                    return (
                      <Flex
                        key={`${med.id}-${index}`}
                        w="full"
                        align="center"
                        gap="4"
                        p="4"
                        rounded="xl"
                        borderWidth="1px"
                        borderColor={taken ? "green.200" : "border"}
                        bg={taken ? "green.50" : "bg.panel"}
                        _dark={{
                          bg: taken ? "green.900/20" : "bg.panel",
                          borderColor: taken ? "green.700" : "border"
                        }}
                        transition="all 0.2s"
                      >
                        <Box
                          w="10"
                          h="10"
                          rounded="xl"
                          bg={`${med.color}.100`}
                          _dark={{ bg: `${med.color}.900/30` }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={`${med.color}.600`}
                          flexShrink={0}
                        >
                          <LuPill size={20} />
                        </Box>
                        <VStack align="flex-start" gap="0" flex="1">
                          <HStack gap="2">
                            <Text fontWeight="semibold" fontSize="sm">{med.name}</Text>
                            <Badge colorPalette={med.color} variant="subtle" size="sm">{med.dosage}</Badge>
                          </HStack>
                          <Text fontSize="xs" color="fg.muted">{med.purpose} · {time}</Text>
                        </VStack>
                        <Button
                          size="sm"
                          variant={taken ? "solid" : "outline"}
                          colorPalette={taken ? "green" : "teal"}
                          onClick={() => toggleTaken(med.id, index)}
                          flexShrink={0}
                        >
                          {taken ? <><LuCheck /> Taken</> : "Mark Taken"}
                        </Button>
                      </Flex>
                    )
                  })}
                </VStack>
              </Box>
            )
          })}
        </VStack>
      )}

      {/* All Medications */}
      {activeTab === "all" && (
        <VStack gap="4">
          {medications.map((med) => {
            const expanded = expandedId === med.id
            const refillPercent = Math.round((med.pillsRemaining / med.totalPills) * 100)
            return (
              <Card.Root key={med.id} variant="outline" w="full">
                <Card.Body gap="0">
                  <Flex
                    align="center"
                    gap="4"
                    cursor="pointer"
                    onClick={() => setExpandedId(expanded ? null : med.id)}
                  >
                    <Box
                      w="12"
                      h="12"
                      rounded="xl"
                      bg={`${med.color}.100`}
                      _dark={{ bg: `${med.color}.900/30` }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color={`${med.color}.600`}
                      flexShrink={0}
                    >
                      <LuPillBottle size={22} />
                    </Box>
                    <VStack align="flex-start" gap="1" flex="1">
                      <HStack gap="2" wrap="wrap">
                        <Text fontWeight="semibold">{med.name}</Text>
                        <Badge colorPalette={med.color} variant="subtle" size="sm">{med.dosage}</Badge>
                        <Badge colorPalette="gray" variant="outline" size="sm">{med.purpose}</Badge>
                      </HStack>
                      <Text fontSize="xs" color="fg.muted">
                        {med.frequency} · {med.times.join(", ")}
                      </Text>
                      <Box w="full">
                        <Flex justify="space-between" mb="1">
                          <Text fontSize="xs" color="fg.muted">Refill: {med.refillDate}</Text>
                          <Text fontSize="xs" color={refillPercent < 30 ? "orange.500" : "fg.muted"}>
                            {med.pillsRemaining}/{med.totalPills} pills
                          </Text>
                        </Flex>
                        <Progress.Root
                          value={refillPercent}
                          colorPalette={refillPercent < 30 ? "orange" : "teal"}
                          size="xs"
                          rounded="full"
                        >
                          <Progress.Track>
                            <Progress.Range />
                          </Progress.Track>
                        </Progress.Root>
                      </Box>
                    </VStack>
                    <HStack gap="2">
                      <Button
                        size="xs"
                        variant="ghost"
                        colorPalette="red"
                        onClick={(e) => { e.stopPropagation(); setMedications((prev) => prev.filter((m) => m.id !== med.id)) }}
                      >
                        <LuX />
                      </Button>
                    </HStack>
                  </Flex>

                  {expanded && (
                    <Box mt="4" pt="4" borderTopWidth="1px" borderColor="border">
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                        <VStack align="flex-start" gap="2">
                          <HStack gap="2">
                            <Box color="blue.500"><LuInfo size={14} /></Box>
                            <Text fontSize="xs" fontWeight="semibold" color="fg.muted">Instructions</Text>
                          </HStack>
                          <Text fontSize="sm" color="fg">{med.instructions}</Text>
                        </VStack>
                        <VStack align="flex-start" gap="2">
                          <HStack gap="2">
                            <Box color="teal.500"><LuCalendarCheck size={14} /></Box>
                            <Text fontSize="xs" fontWeight="semibold" color="fg.muted">Prescriber</Text>
                          </HStack>
                          <Text fontSize="sm" color="fg">{med.prescriber}</Text>
                          <HStack gap="2" mt="1">
                            <Button size="xs" variant="outline" colorPalette="teal">
                              <LuBell /> Set Reminder
                            </Button>
                            <Button size="xs" variant="outline" colorPalette="orange">
                              <LuRefreshCw /> Request Refill
                            </Button>
                          </HStack>
                        </VStack>
                      </SimpleGrid>
                    </Box>
                  )}
                </Card.Body>
              </Card.Root>
            )
          })}
        </VStack>
      )}

      {/* Interactions */}
      {activeTab === "interactions" && (
        <Box>
          <Flex gap="3" p="4" bg="blue.50" _dark={{ bg: "blue.900/20" }} rounded="xl" borderWidth="1px" borderColor="blue.200" mb="5">
            <Box color="blue.500" flexShrink={0} mt="0.5">
              <LuInfo size={18} />
            </Box>
            <Text fontSize="sm" color="fg.muted">
              Drug interaction checks are informational only. Always consult your pharmacist or physician for personalized advice.
            </Text>
          </Flex>

          {interactions.length === 0 ? (
            <Card.Root variant="outline">
              <Card.Body textAlign="center" py="10">
                <LuCheck size={32} color="var(--chakra-colors-green-500)" style={{ margin: "0 auto 12px" }} />
                <Text fontWeight="semibold">No known interactions detected</Text>
                <Text fontSize="sm" color="fg.muted" mt="1">Your current medications have no flagged interactions.</Text>
              </Card.Body>
            </Card.Root>
          ) : (
            <VStack gap="4">
              {interactions.map((int, i) => (
                <Card.Root
                  key={i}
                  variant="outline"
                  borderColor={int.severity === "low" ? "yellow.300" : "orange.300"}
                  bg={int.severity === "low" ? "yellow.50" : "orange.50"}
                  _dark={{
                    bg: int.severity === "low" ? "yellow.900/20" : "orange.900/20",
                    borderColor: int.severity === "low" ? "yellow.700" : "orange.700"
                  }}
                >
                  <Card.Body gap="3">
                    <HStack justify="space-between">
                      <HStack gap="2">
                        <Box color={int.severity === "low" ? "yellow.600" : "orange.600"}>
                          <LuTriangleAlert size={18} />
                        </Box>
                        <HStack gap="2" flexWrap="wrap">
                          <Badge colorPalette="teal" variant="subtle">{int.drug1}</Badge>
                          <Text fontSize="sm" color="fg.muted">+</Text>
                          <Badge colorPalette="blue" variant="subtle">{int.drug2}</Badge>
                        </HStack>
                      </HStack>
                      <Badge
                        colorPalette={int.severity === "low" ? "yellow" : "orange"}
                        variant="solid"
                        size="sm"
                        textTransform="capitalize"
                        rounded="full"
                      >
                        {int.severity} severity
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="fg.muted">{int.note}</Text>
                    <Button size="xs" variant="outline" colorPalette="teal" w="fit-content">
                      <LuCalendarCheck /> Discuss with Doctor
                    </Button>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Container>
  )
}
