import { useState } from "react"
import { Box, Flex, HStack, Text, IconButton, Badge } from "@chakra-ui/react"
import { LuHeartPulse, LuLayoutDashboard, LuStethoscope, LuCalendarCheck, LuPill, LuMenu, LuX, LuBell } from "react-icons/lu"
import { ColorModeButton } from "@/components/ui/color-mode"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import SymptomCheckerPage from "./pages/SymptomCheckerPage"
import AppointmentsPage from "./pages/AppointmentsPage"
import MedicationsPage from "./pages/MedicationsPage"

type Page = "home" | "dashboard" | "symptoms" | "appointments" | "medications"

const navItems = [
  { id: "home" as Page, label: "Home", icon: LuHeartPulse },
  { id: "dashboard" as Page, label: "Dashboard", icon: LuLayoutDashboard },
  { id: "symptoms" as Page, label: "Symptom Checker", icon: LuStethoscope },
  { id: "appointments" as Page, label: "Appointments", icon: LuCalendarCheck },
  { id: "medications" as Page, label: "Medications", icon: LuPill },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={setCurrentPage} />
      case "dashboard": return <DashboardPage />
      case "symptoms": return <SymptomCheckerPage />
      case "appointments": return <AppointmentsPage />
      case "medications": return <MedicationsPage />
    }
  }

  return (
    <Box minH="100vh" bg="bg">
      {/* Nav */}
      <Box
        as="nav"
        position="sticky"
        top="0"
        zIndex="sticky"
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="border"
        shadow="sm"
      >
        <Flex maxW="7xl" mx="auto" px={{ base: "4", md: "6" }} h="16" align="center" justify="space-between">
          <HStack gap="2" cursor="pointer" onClick={() => setCurrentPage("home")}>
            <Box color="teal.500">
              <LuHeartPulse size={28} />
            </Box>
            <Text fontWeight="bold" fontSize="xl" color="fg" letterSpacing="tight">
              VitalSync
            </Text>
            <Badge colorPalette="teal" size="sm" variant="subtle">MVP</Badge>
          </HStack>

          {/* Desktop Nav */}
          <HStack gap="1" hideBelow="md">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = currentPage === item.id
              return (
                <Flex
                  key={item.id}
                  as="button"
                  align="center"
                  gap="1.5"
                  px="3"
                  py="2"
                  rounded="md"
                  cursor="pointer"
                  fontSize="sm"
                  fontWeight={active ? "semibold" : "medium"}
                  color={active ? "teal.600" : "fg.muted"}
                  bg={active ? "teal.50" : "transparent"}
                  _dark={{ bg: active ? "teal.900/30" : "transparent", color: active ? "teal.300" : "fg.muted" }}
                  _hover={{ bg: "bg.subtle", color: "fg" }}
                  transition="all 0.15s"
                  onClick={() => setCurrentPage(item.id)}
                >
                  <Icon size={16} />
                  {item.label}
                </Flex>
              )
            })}
          </HStack>

          <HStack gap="2">
            <Box position="relative">
              <IconButton variant="ghost" size="sm" aria-label="Notifications">
                <LuBell />
              </IconButton>
              <Box
                position="absolute"
                top="1"
                right="1"
                w="2"
                h="2"
                bg="red.500"
                rounded="full"
              />
            </Box>
            <ColorModeButton />
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Menu"
              hideFrom="md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <LuX /> : <LuMenu />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box hideFrom="md" borderTopWidth="1px" borderColor="border" bg="bg.panel" pb="2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = currentPage === item.id
              return (
                <Flex
                  key={item.id}
                  as="button"
                  align="center"
                  gap="3"
                  w="full"
                  px="4"
                  py="3"
                  cursor="pointer"
                  fontSize="sm"
                  fontWeight={active ? "semibold" : "medium"}
                  color={active ? "teal.600" : "fg.muted"}
                  bg={active ? "teal.50" : "transparent"}
                  _dark={{ bg: active ? "teal.900/30" : "transparent" }}
                  onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false) }}
                >
                  <Icon size={18} />
                  {item.label}
                </Flex>
              )
            })}
          </Box>
        )}
      </Box>

      {/* Page content */}
      <Box>{renderPage()}</Box>
    </Box>
  )
}
