import { Avatar } from "@catalyst/avatar";
import { Dropdown, DropdownButton } from "@catalyst/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@catalyst/navbar";
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer
} from "@catalyst/sidebar";
import { SidebarLayout } from "@catalyst/sidebar-layout";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/react-router";
import {
    Cog6ToothIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon
} from "@heroicons/react/20/solid";
import { ArrowRightEndOnRectangleIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router";

export const AppLayout = () => {
    const { user } = useUser();
    return (
        <SidebarLayout
            navbar={
                <Navbar className="bg-slate-100">
                    <NavbarSpacer />
                    <NavbarSection>
                        <NavbarItem aria-label="Search">
                            <MagnifyingGlassIcon />
                        </NavbarItem>
                        <NavbarItem aria-label="Inbox">
                            <InboxIcon />
                        </NavbarItem>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                {/* Show the sign-in button when the user is signed out */}
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                {/* Show the user button when the user is signed in */}
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </DropdownButton>
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar className="bg-slate-100">
                    <SidebarHeader>
                        <SidebarItem href="/" className="lg:mb-2.5">
                            <Avatar src="/vite.svg" />
                            <SidebarLabel>StewardHQ</SidebarLabel>
                        </SidebarItem>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarItem>
                                <MagnifyingGlassIcon />
                                <SidebarLabel>Search</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem>
                                <InboxIcon />
                                <SidebarLabel>Inbox</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            <SidebarItem href="/" current>
                                <CalendarIcon />
                                <SidebarLabel>Schedule</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem>
                                <Square2StackIcon />
                                <SidebarLabel>Events</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem>
                                <TicketIcon />
                                <SidebarLabel>Orders</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem>
                                <Cog6ToothIcon />
                                <SidebarLabel>Settings</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                        <SidebarSpacer />
                        <SidebarSection>
                            <SidebarItem>
                                <QuestionMarkCircleIcon />
                                <SidebarLabel>Support</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem>
                                <SparklesIcon />
                                <SidebarLabel>Changelog</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarBody>
                    <SidebarFooter className="max-lg:hidden">
                        {/* Show the sign-in button when the user is signed out */}
                        <SignedOut>
                            <SignInButton>
                                <SidebarItem>
                                    <ArrowRightEndOnRectangleIcon />
                                    <SidebarLabel>Sign in</SidebarLabel>
                                </SidebarItem>
                            </SignInButton>
                        </SignedOut>
                        {/* Show the user button when the user is signed in */}
                        <SignedIn>
                            <span className="flex min-w-0 items-center gap-3">
                                <UserButton />
                                <span className="min-w-0">
                                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                        {user?.primaryEmailAddress?.emailAddress}
                                    </span>
                                </span>
                            </span>
                        </SignedIn>
                    </SidebarFooter>
                </Sidebar>
            }>
            {/* The page content */}
            <Outlet />
        </SidebarLayout>
    );
};
