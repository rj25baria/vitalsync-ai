import { useState } from "react"
import {
  Box, Container, Flex, Heading, Text, SimpleGrid, HStack, VStack,
  Badge, Card, Progress, Button, Separator
} from "@chakra-ui/react"
import {
  LuActivity, LuHeart, LuTrendingUp, LuTrendingDown, LuCalendarCheck,
  LuPill, LuDroplets, LuBed, LuFlame, LuBrain, LuTriangleAlert, LuCircleCheck
} from "react-icons/lu"

const vitals = [
  { label: "Heart Rate", value: "72", unit: "bpm", trend: "+2%", up: true, icon: LuHeart, color: "red", normal: true },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", trend: "Normal", up: false, icon: LuActivity, color: "teal", normal: true },
  { label: "Blood Oxygen", value: "98", unit: "%", trend: "+0.5%", up: true, icon: LuDroplets, color: "blue", normal: true },
  { label: "BMI", value: "24.2", unit: "", trend: "Normal", up: false, icon: LuFlame, color: "orange", normal: true },
]

const healthGoals = [
  { label: "Daily Steps", current: 6842, target: 10000, color: "teal", unit: "steps" },
  { label: "Water Intake", current: 6, target: 8, color: "blue", unit: "glasses" },
  { label: "Sleep Quality", current: 7.5, target: 8, color: "purple", unit: "hrs" },
  { label: "Active Minutes", current: 35, target: 60, color: "orange", unit: "min" },
]

const weeklyData = [
  { day: "Mon", steps: 7200, sleep: 7.5, mood: 4 },
  { day: "Tue", steps: 5400, sleep: 8, mood: 3 },
  { day: "Wed", steps: 9100, sleep: 6.5, mood: 5 },
  { day: "Thu", steps: 6842, sleep: 7.5, mood: 4 },
  { day: "Fri", steps: 4200, sleep: 8.5, mood: 4 },
  { day: "Sat", steps: 11300, sleep: 9, mood: 5 },
  { day: "Sun", steps: 3100, sleep: 8, mood: 3 },
]

const upcomingAppointments = [
  { doctor: "Dr. Sarah Chen", specialty: "Primary Care", date: "Jul 28, 2025", time: "10:00 AM", type: "In-Person" },
  { doctor: "Dr. James Park", specialty: "Cardiology", date: "Aug 5, 2025", time: "2:30 PM", type: "Telehealth" },
]

const alerts = [
  { type: "warning", message: "Blood pressure slightly elevated in last 3 readings. Consider reducing sodium intake." },
  { type: "info", message: "You're due for annual bloodwork. Schedule with your primary care provider." },
  { type: "success", message: "You've hit your step goal 4 days this week. Great work!" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "trends" | "history">("overview")

  return (
    <Container maxW="7xl" py="8" px={{ base: "4", md: "6" }}>
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb="8" gap="4" wrap="wrap">
        <VStack align="flex-start" gap="1">
          <Heading fontSize="2xl" fontWeight="bold">Health Dashboard</Heading>
          <Text color="fg.muted" fontSize="sm">Good morning, Alex — here's your health summary for today.</Text>
        </VStack>
        <HStack gap="2">
          <Badge colorPalette="green" variant="subtle" size="lg" px="3" py="1.5">
            <LuCircleCheck />
            Overall: Good
          </Badge>
        </HStack>
      </Flex>

      {/* Alerts */}
      <VStack gap="3" mb="8">
        {alerts.map((alert, i) => (
          <Flex
            key={i}
            w="full"
            align="flex-start"
            gap="3"
            p="4"
            rounded="xl"
            borderWidth="1px"
            borderColor={alert.type === "warning" ? "orange.200" : alert.type === "success" ? "green.200" : "blue.200"}
            bg={alert.type === "warning" ? "orange.50" : alert.type === "success" ? "green.50" : "blue.50"}
            _dark={{
              bg: alert.type === "warning" ? "orange.900/20" : alert.type === "success" ? "green.900/20" : "blue.900/20",
              borderColor: alert.type === "warning" ? "orange.700" : alert.type === "success" ? "green.700" : "blue.700"
            }}
          >
            <Box
              color={alert.type === "warning" ? "orange.500" : alert.type === "success" ? "green.500" : "blue.500"}
              mt="0.5"
              flexShrink={0}
            >
              {alert.type === "warning" ? <LuTriangleAlert size={18} /> :
                alert.type === "success" ? <LuCircleCheck size={18} /> : <LuBrain size={18} />}
            </Box>
            <Text fontSize="sm" color="fg">{alert.message}</Text>
          </Flex>
        ))}
      </VStack>

      {/* Vitals */}
      <Heading size="md" mb="4" color="fg">Current Vitals</Heading>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="8">
        {vitals.map((v) => {
          const VIcon = v.icon
          return (
            <Card.Root key={v.label} variant="outline">
              <Card.Body p="4">
                <Flex justify="space-between" align="flex-start" mb="3">
                  <Box
                    w="10"
                    h="10"
                    rounded="xl"
                    bg={`${v.color}.100`}
                    _dark={{ bg: `${v.color}.900/30` }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color={`${v.color}.600`}
                  >
                    <VIcon size={20} />
                  </Box>
                  <Badge
                    colorPalette={v.normal ? "green" : "red"}
                    variant="subtle"
                    size="sm"
                    rounded="full"
                  >
                    {v.normal ? "Normal" : "High"}
                  </Badge>
                </Flex>
                <Text fontWeight="black" fontSize="2xl" color="fg" lineHeight="1">
                  {v.value}
                  <Text as="span" fontSize="sm" fontWeight="normal" color="fg.muted" ml="1">{v.unit}</Text>
                </Text>
                <Text fontSize="xs" color="fg.muted" mt="1">{v.label}</Text>
                <HStack mt="2" gap="1" color={v.up ? "green.500" : "blue.500"} fontSize="xs">
                  {v.up ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
                  <Text>{v.trend}</Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          )
        })}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="6" mb="8">
        {/* Health Goals */}
        <Box gridColumn={{ lg: "span 2" }}>
          <Card.Root variant="outline">
            <Card.Body>
              <Heading size="md" mb="5">Today's Health Goals</Heading>
              <VStack gap="5">
                {healthGoals.map((goal) => {
                  const percent = Math.round((goal.current / goal.target) * 100)
                  return (
                    <Box key={goal.label} w="full">
                      <Flex justify="space-between" mb="2">
                        <Text fontSize="sm" fontWeight="medium">{goal.label}</Text>
                        <HStack gap="1">
                          <Text fontSize="sm" fontWeight="bold" color="fg">{goal.current}</Text>
                          <Text fontSize="xs" color="fg.muted">/ {goal.target} {goal.unit}</Text>
                          <Badge colorPalette={percent >= 100 ? "green" : percent >= 60 ? "orange" : "red"} variant="subtle" size="sm">
                            {percent}%
                          </Badge>
                        </HStack>
                      </Flex>
                      <Progress.Root value={percent} colorPalette={goal.color} size="sm" rounded="full">
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                    </Box>
                  )
                })}
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>

        {/* Upcoming Appointments */}
        <Card.Root variant="outline">
          <Card.Body>
            <HStack justify="space-between" mb="4">
              <Heading size="md">Upcoming</Heading>
              <LuCalendarCheck size={18} />
            </HStack>
            <VStack gap="4">
              {upcomingAppointments.map((apt, i) => (
                <Box key={i} w="full">
                  <Flex gap="3" align="flex-start">
                    <Box
                      w="10"
                      h="10"
                      rounded="xl"
                      bg="teal.100"
                      _dark={{ bg: "teal.900/30" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="teal.600"
                      flexShrink={0}
                    >
                      <LuCalendarCheck size={18} />
                    </Box>
                    <VStack align="flex-start" gap="0.5">
                      <Text fontWeight="semibold" fontSize="sm">{apt.doctor}</Text>
                      <Text fontSize="xs" color="fg.muted">{apt.specialty}</Text>
                      <HStack gap="2" mt="1">
                        <Text fontSize="xs" color="fg.muted">{apt.date}</Text>
                        <Text fontSize="xs" color="fg.subtle">·</Text>
                        <Text fontSize="xs" color="fg.muted">{apt.time}</Text>
                      </HStack>
                      <Badge
                        colorPalette={apt.type === "Telehealth" ? "blue" : "teal"}
                        variant="subtle"
                        size="sm"
                        mt="1"
                      >
                        {apt.type}
                      </Badge>
                    </VStack>
                  </Flex>
                  {i < upcomingAppointments.length - 1 && <Separator mt="4" />}
                </Box>
              ))}
              <Button size="sm" variant="outline" w="full" colorPalette="teal">
                View All Appointments
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Weekly Trend Chart (visual bars) */}
      <Card.Root variant="outline">
        <Card.Body>
          <HStack justify="space-between" mb="6">
            <Heading size="md">Weekly Activity</Heading>
            <HStack gap="2">
              {(["overview", "trends", "history"] as const).map((tab) => (
                <Button
                  key={tab}
                  size="xs"
                  variant={activeTab === tab ? "solid" : "ghost"}
                  colorPalette="teal"
                  textTransform="capitalize"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </HStack>
          </HStack>

          {/* Steps bar chart */}
          <Box>
            <Text fontSize="xs" color="fg.muted" mb="3">Daily Steps</Text>
            <Flex align="flex-end" gap="2" h="32">
              {weeklyData.map((d) => {
                const h = (d.steps / 12000) * 100
                const isGood = d.steps >= 8000
                return (
                  <VStack key={d.day} gap="1" flex="1" align="center">
                    <Text fontSize="xs" color="fg.muted">{d.steps.toLocaleString()}</Text>
                    <Box
                      w="full"
                      bg={isGood ? "teal.400" : "teal.200"}
                      _dark={{ bg: isGood ? "teal.500" : "teal.800" }}
                      rounded="sm"
                      style={{ height: `${h}%` }}
                      transition="height 0.3s"
                    />
                    <Text fontSize="xs" color="fg.muted">{d.day}</Text>
                  </VStack>
                )
              })}
            </Flex>
          </Box>

          <Separator my="5" />

          {/* Sleep */}
          <Box>
            <Text fontSize="xs" color="fg.muted" mb="3">Sleep Duration (hours)</Text>
            <Flex align="flex-end" gap="2" h="24">
              {weeklyData.map((d) => {
                const h = (d.sleep / 10) * 100
                return (
                  <VStack key={d.day} gap="1" flex="1" align="center">
                    <Text fontSize="xs" color="fg.muted">{d.sleep}</Text>
                    <Box
                      w="full"
                      bg={d.sleep >= 8 ? "purple.400" : "purple.200"}
                      _dark={{ bg: d.sleep >= 8 ? "purple.500" : "purple.800" }}
                      rounded="sm"
                      style={{ height: `${h}%` }}
                      transition="height 0.3s"
                    />
                    <Text fontSize="xs" color="fg.muted">{d.day}</Text>
                  </VStack>
                )
              })}
            </Flex>
          </Box>
        </Card.Body>
      </Card.Root>

      {/* Quick Actions */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mt="6">
        {[
          { label: "Log Vitals", icon: LuActivity, color: "teal" },
          { label: "Add Medication", icon: LuPill, color: "purple" },
          { label: "Book Appointment", icon: LuCalendarCheck, color: "blue" },
          { label: "Sleep Log", icon: LuBed, color: "indigo" },
        ].map((action) => {
          const ActionIcon = action.icon
          return (
            <Button
              key={action.label}
              variant="outline"
              colorPalette={action.color}
              h="auto"
              py="4"
              flexDir="column"
              gap="2"
            >
              <ActionIcon size={20} />
              <Text fontSize="xs">{action.label}</Text>
            </Button>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}
