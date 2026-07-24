import { useState } from "react"
import {
  Box, Container, Flex, Heading, Text, Button, HStack, VStack,
  Badge, Card, SimpleGrid, Input, Textarea
} from "@chakra-ui/react"
import {
  LuStethoscope, LuArrowRight, LuArrowLeft, LuCircleCheck, LuTriangleAlert,
  LuCircleAlert, LuThumbsUp, LuUser, LuSearch, LuX, LuRefreshCw
} from "react-icons/lu"

const commonSymptoms = [
  "Fever", "Headache", "Fatigue", "Nausea", "Cough", "Shortness of breath",
  "Chest pain", "Sore throat", "Runny nose", "Muscle aches", "Dizziness",
  "Vomiting", "Diarrhea", "Rash", "Joint pain", "Back pain",
  "Loss of appetite", "Blurred vision", "Abdominal pain", "Chills",
]

const bodyAreas = [
  "Head & Neck", "Chest", "Abdomen", "Back", "Arms & Hands",
  "Legs & Feet", "Skin", "Eyes", "Ears", "Whole Body",
]

type Severity = "mild" | "moderate" | "severe"
type Step = "info" | "symptoms" | "duration" | "result"

interface AnalysisResult {
  urgency: "self-care" | "see-doctor" | "urgent" | "emergency"
  title: string
  description: string
  recommendations: string[]
  possibleConditions: string[]
}

function getAnalysis(symptoms: string[], duration: string, severity: Severity): AnalysisResult {
  const hasChestPain = symptoms.includes("Chest pain")
  const hasBreathing = symptoms.includes("Shortness of breath")
  const hasHighRisk = hasChestPain || hasBreathing

  if (hasHighRisk && severity === "severe") {
    return {
      urgency: "emergency",
      title: "Seek Emergency Care Immediately",
      description: "Your symptoms suggest a potentially serious condition requiring immediate medical attention.",
      recommendations: [
        "Call 911 or go to the nearest emergency room immediately",
        "Do not drive yourself — ask someone to take you or call an ambulance",
        "Chew aspirin if you suspect a heart attack (unless allergic)",
        "Stay calm and avoid physical exertion",
      ],
      possibleConditions: ["Cardiac event", "Pulmonary embolism", "Severe respiratory distress"],
    }
  }

  if (severity === "severe" || (hasHighRisk && severity === "moderate")) {
    return {
      urgency: "urgent",
      title: "Seek Urgent Care Today",
      description: "Your symptoms warrant prompt medical evaluation. Please visit an urgent care clinic or contact your doctor today.",
      recommendations: [
        "Visit an urgent care clinic within the next few hours",
        "Call your doctor's office for same-day appointment",
        "Avoid strenuous activity and rest",
        "Monitor symptoms for any rapid changes",
      ],
      possibleConditions: ["Respiratory infection", "Flu", "Cardiac concern", "Systemic infection"],
    }
  }

  if (severity === "moderate" || (symptoms.length >= 4)) {
    return {
      urgency: "see-doctor",
      title: "Schedule a Doctor Visit",
      description: "Your symptoms suggest you should see a healthcare provider within the next 1–2 days.",
      recommendations: [
        "Schedule an appointment with your primary care doctor",
        "Rest and stay hydrated",
        "Over-the-counter medications may help manage symptoms",
        "Keep a symptom journal to share with your doctor",
      ],
      possibleConditions: ["Viral illness", "Bacterial infection", "Inflammatory condition", "Allergy"],
    }
  }

  return {
    urgency: "self-care",
    title: "Self-Care Likely Sufficient",
    description: "Your symptoms appear mild and may be manageable at home with self-care measures.",
    recommendations: [
      "Rest and get plenty of sleep",
      "Stay well hydrated — drink 8+ glasses of water daily",
      "Over-the-counter medications as needed for symptom relief",
      "Monitor symptoms — seek care if they worsen or persist beyond 5–7 days",
    ],
    possibleConditions: ["Common cold", "Mild viral illness", "Seasonal allergies", "Fatigue"],
  }
}

const urgencyConfig = {
  "self-care": { color: "green", icon: LuThumbsUp, label: "Self-Care" },
  "see-doctor": { color: "blue", icon: LuCircleCheck, label: "See Doctor" },
  "urgent": { color: "orange", icon: LuTriangleAlert, label: "Urgent Care" },
  "emergency": { color: "red", icon: LuCircleAlert, label: "Emergency" },
}

export default function SymptomCheckerPage() {
  const [step, setStep] = useState<Step>("info")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedArea, setSelectedArea] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [duration, setDuration] = useState("")
  const [severity, setSeverity] = useState<Severity | "">("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const filteredSymptoms = commonSymptoms.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0 || !duration || !severity) return
    const analysis = getAnalysis(selectedSymptoms, duration, severity as Severity)
    setResult(analysis)
    setStep("result")
  }

  const reset = () => {
    setStep("info")
    setAge("")
    setGender("")
    setSelectedSymptoms([])
    setSelectedArea("")
    setDuration("")
    setSeverity("")
    setAdditionalNotes("")
    setResult(null)
    setSearchTerm("")
  }

  return (
    <Container maxW="3xl" py="10" px={{ base: "4", md: "6" }}>
      <VStack gap="2" mb="8" textAlign="center">
        <Box color="teal.500" mb="1">
          <LuStethoscope size={36} />
        </Box>
        <Heading fontSize="2xl" fontWeight="bold">AI Symptom Checker</Heading>
        <Text color="fg.muted" maxW="lg" fontSize="sm">
          Answer a few questions about your symptoms to receive personalized triage guidance.
          This tool does not replace professional medical advice.
        </Text>
      </VStack>

      {/* Progress Steps */}
      {step !== "result" && (
        <HStack gap="0" mb="8" justify="center">
          {(["info", "symptoms", "duration"] as Step[]).map((s, i, arr) => {
            const stepIndex = { info: 0, symptoms: 1, duration: 2, result: 3 }
            const currentIndex = stepIndex[step]
            const sIndex = stepIndex[s]
            const done = sIndex < currentIndex
            const active = s === step
            return (
              <HStack key={s} gap="0">
                <Flex
                  w="8"
                  h="8"
                  rounded="full"
                  align="center"
                  justify="center"
                  bg={done ? "teal.500" : active ? "teal.500" : "bg.subtle"}
                  borderWidth="2px"
                  borderColor={active || done ? "teal.500" : "border"}
                  color={active || done ? "white" : "fg.muted"}
                  fontSize="sm"
                  fontWeight="bold"
                  transition="all 0.2s"
                >
                  {done ? <LuCircleCheck size={14} /> : sIndex + 1}
                </Flex>
                {i < arr.length - 1 && (
                  <Box
                    h="0.5"
                    w="20"
                    bg={done ? "teal.500" : "border"}
                    transition="all 0.2s"
                  />
                )}
              </HStack>
            )
          })}
        </HStack>
      )}

      {/* Step 1: Personal Info */}
      {step === "info" && (
        <Card.Root variant="outline">
          <Card.Body gap="6">
            <Heading size="md">Basic Information</Heading>
            <SimpleGrid columns={2} gap="4">
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb="2">Age</Text>
                <Input
                  placeholder="e.g. 35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb="2">Biological Sex</Text>
                <Flex gap="2">
                  {["Male", "Female", "Other"].map((g) => (
                    <Button
                      key={g}
                      size="sm"
                      flex="1"
                      variant={gender === g ? "solid" : "outline"}
                      colorPalette="teal"
                      onClick={() => setGender(g)}
                    >
                      {g}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </SimpleGrid>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="3">Primary Area of Concern</Text>
              <Flex gap="2" flexWrap="wrap">
                {bodyAreas.map((area) => (
                  <Badge
                    key={area}
                    px="3"
                    py="1.5"
                    rounded="full"
                    cursor="pointer"
                    variant={selectedArea === area ? "solid" : "outline"}
                    colorPalette="teal"
                    onClick={() => setSelectedArea(area)}
                    _hover={{ opacity: 0.8 }}
                    transition="all 0.15s"
                  >
                    {area}
                  </Badge>
                ))}
              </Flex>
            </Box>

            <Button
              colorPalette="teal"
              w="full"
              size="lg"
              onClick={() => setStep("symptoms")}
              disabled={!age || !gender}
            >
              Continue <LuArrowRight />
            </Button>
          </Card.Body>
        </Card.Root>
      )}

      {/* Step 2: Symptoms */}
      {step === "symptoms" && (
        <Card.Root variant="outline">
          <Card.Body gap="5">
            <Heading size="md">Select Your Symptoms</Heading>
            <Text fontSize="sm" color="fg.muted">Select all symptoms you're currently experiencing.</Text>

            <Box position="relative">
              <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="fg.muted" pointerEvents="none">
                <LuSearch size={16} />
              </Box>
              <Input
                pl="9"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            {selectedSymptoms.length > 0 && (
              <Box>
                <Text fontSize="xs" color="fg.muted" mb="2">Selected ({selectedSymptoms.length}):</Text>
                <Flex gap="2" flexWrap="wrap">
                  {selectedSymptoms.map((s) => (
                    <Badge
                      key={s}
                      colorPalette="teal"
                      variant="solid"
                      px="3"
                      py="1"
                      rounded="full"
                      cursor="pointer"
                      onClick={() => toggleSymptom(s)}
                    >
                      {s} <LuX size={12} style={{ display: "inline", marginLeft: "4px" }} />
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}

            <Flex gap="2" flexWrap="wrap">
              {filteredSymptoms.map((s) => {
                const selected = selectedSymptoms.includes(s)
                return (
                  <Badge
                    key={s}
                    px="3"
                    py="1.5"
                    rounded="full"
                    cursor="pointer"
                    variant={selected ? "solid" : "outline"}
                    colorPalette={selected ? "teal" : "gray"}
                    onClick={() => toggleSymptom(s)}
                    _hover={{ opacity: 0.8 }}
                    transition="all 0.15s"
                  >
                    {s}
                  </Badge>
                )
              })}
            </Flex>

            <HStack gap="3" mt="2">
              <Button variant="outline" onClick={() => setStep("info")} flex="1">
                <LuArrowLeft /> Back
              </Button>
              <Button
                colorPalette="teal"
                flex="2"
                onClick={() => setStep("duration")}
                disabled={selectedSymptoms.length === 0}
              >
                Continue ({selectedSymptoms.length} selected) <LuArrowRight />
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      )}

      {/* Step 3: Duration & Severity */}
      {step === "duration" && (
        <Card.Root variant="outline">
          <Card.Body gap="6">
            <Heading size="md">Duration & Severity</Heading>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="3">How long have you had these symptoms?</Text>
              <SimpleGrid columns={2} gap="2">
                {["Less than 1 day", "1–3 days", "4–7 days", "1–2 weeks", "2–4 weeks", "Over a month"].map((d) => (
                  <Button
                    key={d}
                    size="sm"
                    variant={duration === d ? "solid" : "outline"}
                    colorPalette="teal"
                    onClick={() => setDuration(d)}
                    textAlign="left"
                    justifyContent="flex-start"
                  >
                    {d}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="3">How severe are your symptoms overall?</Text>
              <Flex gap="3">
                {(["mild", "moderate", "severe"] as Severity[]).map((s) => (
                  <Box
                    key={s}
                    flex="1"
                    p="4"
                    rounded="xl"
                    borderWidth="2px"
                    borderColor={severity === s
                      ? (s === "mild" ? "green.400" : s === "moderate" ? "orange.400" : "red.400")
                      : "border"
                    }
                    bg={severity === s
                      ? (s === "mild" ? "green.50" : s === "moderate" ? "orange.50" : "red.50")
                      : "transparent"
                    }
                    _dark={{
                      bg: severity === s
                        ? (s === "mild" ? "green.900/20" : s === "moderate" ? "orange.900/20" : "red.900/20")
                        : "transparent"
                    }}
                    cursor="pointer"
                    textAlign="center"
                    onClick={() => setSeverity(s)}
                    transition="all 0.2s"
                  >
                    <Text
                      fontSize="xl"
                      mb="1"
                    >
                      {s === "mild" ? "😊" : s === "moderate" ? "😐" : "😢"}
                    </Text>
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      textTransform="capitalize"
                      color={severity === s
                        ? (s === "mild" ? "green.700" : s === "moderate" ? "orange.700" : "red.700")
                        : "fg.muted"
                      }
                    >
                      {s}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="2">Additional notes (optional)</Text>
              <Textarea
                placeholder="Any other relevant information, medical history, medications..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
              />
            </Box>

            <HStack gap="3">
              <Button variant="outline" onClick={() => setStep("symptoms")} flex="1">
                <LuArrowLeft /> Back
              </Button>
              <Button
                colorPalette="teal"
                flex="2"
                size="lg"
                onClick={handleAnalyze}
                disabled={!duration || !severity}
              >
                Analyze Symptoms <LuStethoscope />
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      )}

      {/* Result */}
      {step === "result" && result && (() => {
        const cfg = urgencyConfig[result.urgency]
        const UrgencyIcon = cfg.icon
        return (
          <VStack gap="5">
            <Card.Root
              variant="outline"
              borderColor={`${cfg.color}.300`}
              bg={`${cfg.color}.50`}
              _dark={{ bg: `${cfg.color}.900/20`, borderColor: `${cfg.color}.700` }}
              w="full"
            >
              <Card.Body>
                <HStack gap="3" mb="4">
                  <Box color={`${cfg.color}.600`}>
                    <UrgencyIcon size={28} />
                  </Box>
                  <VStack align="flex-start" gap="0.5">
                    <Badge colorPalette={cfg.color} variant="solid" size="md" rounded="full">
                      {cfg.label}
                    </Badge>
                    <Heading size="md" color="fg">{result.title}</Heading>
                  </VStack>
                </HStack>
                <Text fontSize="sm" color="fg.muted" lineHeight="tall">{result.description}</Text>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline" w="full">
              <Card.Body gap="4">
                <Heading size="sm">Recommendations</Heading>
                <VStack gap="3" align="flex-start">
                  {result.recommendations.map((r, i) => (
                    <HStack key={i} gap="3" align="flex-start">
                      <Box color="teal.500" flexShrink={0} mt="0.5">
                        <LuCircleCheck size={16} />
                      </Box>
                      <Text fontSize="sm" color="fg.muted">{r}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline" w="full">
              <Card.Body gap="4">
                <Heading size="sm">Possible Conditions</Heading>
                <Flex gap="2" flexWrap="wrap">
                  {result.possibleConditions.map((c) => (
                    <Badge key={c} colorPalette="gray" variant="outline" px="3" py="1.5" rounded="full">
                      {c}
                    </Badge>
                  ))}
                </Flex>
                <Box
                  bg="orange.50"
                  _dark={{ bg: "orange.900/20" }}
                  borderWidth="1px"
                  borderColor="orange.200"
                  _dark2={{ borderColor: "orange.700" }}
                  rounded="lg"
                  p="3"
                >
                  <HStack gap="2">
                    <LuTriangleAlert size={14} color="var(--chakra-colors-orange-500)" />
                    <Text fontSize="xs" color="orange.700" _dark={{ color: "orange.300" }}>
                      This analysis is for informational purposes only and does not constitute medical advice.
                      Always consult a qualified healthcare professional for diagnosis and treatment.
                    </Text>
                  </HStack>
                </Box>
              </Card.Body>
            </Card.Root>

            <VStack gap="2" mb="2">
              <Text fontSize="xs" color="fg.subtle" fontWeight="medium">
                Analyzed: {selectedSymptoms.length} symptoms · {duration} · {severity} severity
              </Text>
            </VStack>

            <Flex gap="3" w="full">
              <Button flex="1" variant="outline" onClick={reset}>
                <LuRefreshCw /> Start Over
              </Button>
              <Button flex="1" colorPalette="teal">
                <LuUser /> Book Appointment
              </Button>
            </Flex>
          </VStack>
        )
      })()}

      {/* Disclaimer */}
      {step !== "result" && (
        <Box
          mt="6"
          p="4"
          bg="bg.subtle"
          rounded="xl"
          borderWidth="1px"
          borderColor="border"
        >
          <HStack gap="2" align="flex-start">
            <Box color="fg.muted" flexShrink={0} mt="0.5">
              <LuTriangleAlert size={14} />
            </Box>
            <Text fontSize="xs" color="fg.muted" lineHeight="tall">
              <Text as="span" fontWeight="semibold">Medical Disclaimer:</Text> This symptom checker is an informational
              tool only. It does not provide diagnoses or replace professional medical advice. If you are experiencing a
              medical emergency, call 911 immediately.
            </Text>
          </HStack>
        </Box>
      )}
    </Container>
  )
}
