import {
  Box, Flex, Heading, Text, Button, HStack, VStack, SimpleGrid, Badge, Container,
  Card, Icon
} from "@chakra-ui/react"
import {
  LuHeartPulse, LuStethoscope, LuCalendarCheck, LuPill, LuShield, LuTrendingUp,
  LuUsers, LuBrain, LuActivity, LuArrowRight, LuCircleCheck, LuStar
} from "react-icons/lu"

type Page = "home" | "dashboard" | "symptoms" | "appointments" | "medications"

interface Props { onNavigate: (page: Page) => void }

const stats = [
  { label: "Patients Helped", value: "12,400+", icon: LuUsers, color: "teal" },
  { label: "Symptoms Analyzed", value: "98,200+", icon: LuActivity, color: "blue" },
  { label: "Appointments Booked", value: "31,500+", icon: LuCalendarCheck, color: "purple" },
  { label: "Accuracy Rate", value: "94.7%", icon: LuBrain, color: "green" },
]

const features = [
  {
    icon: LuStethoscope,
    title: "AI Symptom Checker",
    description: "Describe your symptoms and get intelligent triage recommendations powered by clinical decision support algorithms.",
    color: "teal",
    page: "symptoms" as Page,
  },
  {
    icon: LuCalendarCheck,
    title: "Smart Appointments",
    description: "Book, reschedule, and manage appointments with your care team. Get reminders and telehealth options.",
    color: "blue",
    page: "appointments" as Page,
  },
  {
    icon: LuPill,
    title: "Medication Tracker",
    description: "Never miss a dose. Track medications, set reminders, and monitor interactions all in one place.",
    color: "purple",
    page: "medications" as Page,
  },
  {
    icon: LuTrendingUp,
    title: "Health Analytics",
    description: "Visualize your health journey over time. Track vitals, trends, and receive personalized insights.",
    color: "orange",
    page: "dashboard" as Page,
  },
  {
    icon: LuShield,
    title: "HIPAA Compliant",
    description: "Your health data is protected with enterprise-grade encryption and full regulatory compliance.",
    color: "green",
    page: "dashboard" as Page,
  },
  {
    icon: LuBrain,
    title: "Personalized Insights",
    description: "AI-driven health recommendations tailored to your unique profile, history, and risk factors.",
    color: "pink",
    page: "dashboard" as Page,
  },
]

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Primary Care Physician",
    text: "VitalSync has transformed how my patients manage their health between visits. The symptom checker is remarkably accurate.",
  },
  {
    name: "James Wilkins",
    role: "Patient, 58",
    text: "I manage three chronic conditions. This app helps me stay on top of my medications and keeps my doctor informed in real time.",
  },
  {
    name: "Maria Santos",
    role: "Nurse Practitioner",
    text: "The appointment and triage system has reduced no-shows by 40% in our clinic. Absolutely game-changing.",
  },
]

export default function HomePage({ onNavigate }: Props) {
  return (
    <Box>
      {/* Hero */}
      <Box
        bgGradient="to-br"
        gradientFrom="teal.500"
        gradientVia="teal.600"
        gradientTo="blue.700"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          opacity="0.08"
          backgroundImage="radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)"
          backgroundSize="60px 60px"
        />
        <Container maxW="6xl" py={{ base: "16", md: "24" }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap="12">
            <VStack align={{ base: "center", lg: "flex-start" }} gap="6" flex="1">
              <Badge
                size="lg"
                px="4"
                py="1.5"
                rounded="full"
                bg="white/20"
                color="white"
                borderWidth="1px"
                borderColor="white/30"
                fontWeight="medium"
              >
                Next-Gen Healthcare Platform
              </Badge>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="black"
                lineHeight="shorter"
                textAlign={{ base: "center", lg: "left" }}
              >
                Your Health,{" "}
                <Text as="span" color="cyan.200">
                  Intelligently
                </Text>{" "}
                Managed
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="white/80"
                maxW="lg"
                textAlign={{ base: "center", lg: "left" }}
                lineHeight="tall"
              >
                VitalSync brings together AI-powered symptom analysis, seamless appointment booking,
                and proactive medication management — all in one secure platform.
              </Text>
              <HStack gap="4" flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                <Button
                  size="lg"
                  bg="white"
                  color="teal.700"
                  _hover={{ bg: "teal.50", transform: "translateY(-1px)", shadow: "lg" }}
                  transition="all 0.2s"
                  fontWeight="bold"
                  px="8"
                  onClick={() => onNavigate("symptoms")}
                >
                  Check Symptoms Now
                  <LuArrowRight />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white/50"
                  color="white"
                  _hover={{ bg: "white/10", borderColor: "white" }}
                  px="8"
                  onClick={() => onNavigate("dashboard")}
                >
                  View Dashboard
                </Button>
              </HStack>
              <HStack gap="6" color="white/70" flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                {["No credit card required", "HIPAA Compliant", "Free 30-day trial"].map((item) => (
                  <HStack key={item} gap="1.5">
                    <LuCircleCheck size={16} />
                    <Text fontSize="sm">{item}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>

            {/* Hero visual */}
            <Box flex="1" hideBelow="lg">
              <Box
                bg="white/10"
                backdropFilter="blur(20px)"
                borderWidth="1px"
                borderColor="white/20"
                rounded="2xl"
                p="6"
                shadow="2xl"
                maxW="sm"
                mx="auto"
              >
                <HStack justify="space-between" mb="5">
                  <Text fontWeight="bold" fontSize="lg">Today's Overview</Text>
                  <Badge bg="green.400/30" color="green.100" px="3" py="1" rounded="full" fontSize="xs">
                    All Good
                  </Badge>
                </HStack>
                <VStack gap="4">
                  {[
                    { label: "Heart Rate", value: "72 bpm", trend: "↑ 2%", color: "red.300" },
                    { label: "Blood Pressure", value: "118/76", trend: "Normal", color: "teal.300" },
                    { label: "Sleep Score", value: "8.2 hrs", trend: "↑ 12%", color: "purple.300" },
                    { label: "Steps Today", value: "6,842", trend: "68% goal", color: "orange.300" },
                  ].map((metric) => (
                    <Flex key={metric.label} align="center" justify="space-between" w="full"
                      bg="white/10" rounded="xl" px="4" py="3"
                    >
                      <HStack gap="3">
                        <Box w="2.5" h="2.5" rounded="full" bg={metric.color} />
                        <Text fontSize="sm" color="white/80">{metric.label}</Text>
                      </HStack>
                      <HStack gap="3">
                        <Text fontWeight="bold" fontSize="sm">{metric.value}</Text>
                        <Text fontSize="xs" color="white/60">{metric.trend}</Text>
                      </HStack>
                    </Flex>
                  ))}
                </VStack>
                <Button mt="5" w="full" size="sm" bg="white/20" color="white" _hover={{ bg: "white/30" }}
                  onClick={() => onNavigate("dashboard")}
                >
                  View Full Dashboard →
                </Button>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Stats */}
      <Box bg="bg.subtle" borderBottomWidth="1px" borderColor="border">
        <Container maxW="6xl" py="10">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <VStack key={stat.label} gap="2" align="center">
                  <Box color={`${stat.color}.500`}>
                    <Icon size={28} />
                  </Box>
                  <Text fontWeight="black" fontSize="3xl" color="fg" lineHeight="1">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="fg.muted" textAlign="center">{stat.label}</Text>
                </VStack>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="6xl" py={{ base: "16", md: "24" }}>
        <VStack gap="4" mb="14" textAlign="center">
          <Badge colorPalette="teal" variant="subtle" size="md" px="4" py="1.5" rounded="full">
            Core Features
          </Badge>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="fg">
            Everything you need for smarter healthcare
          </Heading>
          <Text fontSize="lg" color="fg.muted" maxW="2xl">
            A complete platform designed for patients and providers to collaborate more effectively and improve health outcomes.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {features.map((f) => {
            const FeatureIcon = f.icon
            return (
              <Card.Root
                key={f.title}
                variant="outline"
                cursor="pointer"
                _hover={{ shadow: "md", transform: "translateY(-2px)", borderColor: `${f.color}.300` }}
                transition="all 0.2s"
                onClick={() => onNavigate(f.page)}
              >
                <Card.Body gap="4">
                  <Flex
                    w="12"
                    h="12"
                    rounded="xl"
                    bg={`${f.color}.100`}
                    _dark={{ bg: `${f.color}.900/30` }}
                    align="center"
                    justify="center"
                    color={`${f.color}.600`}
                    _dark2={{ color: `${f.color}.400` }}
                  >
                    <FeatureIcon size={24} />
                  </Flex>
                  <VStack align="flex-start" gap="2">
                    <Heading size="md" color="fg">{f.title}</Heading>
                    <Text fontSize="sm" color="fg.muted" lineHeight="tall">{f.description}</Text>
                  </VStack>
                  <HStack color={`${f.color}.600`} fontSize="sm" fontWeight="medium" mt="auto">
                    <Text>Explore</Text>
                    <LuArrowRight size={14} />
                  </HStack>
                </Card.Body>
              </Card.Root>
            )
          })}
        </SimpleGrid>
      </Container>

      {/* Testimonials */}
      <Box bg="bg.subtle" borderTopWidth="1px" borderColor="border">
        <Container maxW="6xl" py={{ base: "16", md: "20" }}>
          <VStack gap="3" mb="12" textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
              Trusted by patients and providers
            </Heading>
            <Text color="fg.muted">Real feedback from our community</Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
            {testimonials.map((t) => (
              <Card.Root key={t.name} variant="outline" bg="bg.panel">
                <Card.Body gap="4">
                  <HStack color="yellow.400">
                    {[...Array(5)].map((_, i) => <LuStar key={i} size={16} fill="currentColor" />)}
                  </HStack>
                  <Text fontSize="sm" color="fg.muted" lineHeight="tall" fontStyle="italic">
                    "{t.text}"
                  </Text>
                  <VStack align="flex-start" gap="0" mt="auto">
                    <Text fontWeight="semibold" fontSize="sm">{t.name}</Text>
                    <Text fontSize="xs" color="fg.muted">{t.role}</Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box bg="teal.600" color="white">
        <Container maxW="4xl" py={{ base: "14", md: "20" }} textAlign="center">
          <VStack gap="6">
            <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
              Ready to take control of your health?
            </Heading>
            <Text fontSize="lg" color="white/80" maxW="xl">
              Join thousands of patients and healthcare providers already using VitalSync to deliver better care.
            </Text>
            <HStack gap="4" flexWrap="wrap" justify="center">
              <Button
                size="xl"
                bg="white"
                color="teal.700"
                _hover={{ bg: "teal.50", transform: "translateY(-1px)", shadow: "lg" }}
                transition="all 0.2s"
                fontWeight="bold"
                px="10"
                onClick={() => onNavigate("dashboard")}
              >
                Get Started Free
              </Button>
              <Button
                size="xl"
                variant="outline"
                borderColor="white/50"
                color="white"
                _hover={{ bg: "white/10" }}
                px="10"
                onClick={() => onNavigate("appointments")}
              >
                Book a Demo
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="bg.panel" borderTopWidth="1px" borderColor="border">
        <Container maxW="6xl" py="8">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap="4">
            <HStack gap="2">
              <Box color="teal.500"><LuHeartPulse size={20} /></Box>
              <Text fontWeight="bold" color="fg">VitalSync</Text>
              <Text fontSize="sm" color="fg.subtle">© 2025</Text>
            </HStack>
            <HStack gap="6" fontSize="sm" color="fg.muted">
              {["Privacy Policy", "Terms of Service", "HIPAA Notice", "Contact"].map((item) => (
                <Text key={item} cursor="pointer" _hover={{ color: "teal.500" }} transition="color 0.15s">
                  {item}
                </Text>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
