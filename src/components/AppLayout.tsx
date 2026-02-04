import { Avatar } from "@catalyst/avatar";
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from "@catalyst/navbar";
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
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, useUser } from "@clerk/react-router";
import {
    ArrowRightEndOnRectangleIcon,
    CalendarIcon,
    CheckBadgeIcon as CheckBadgeIconSolid
} from "@heroicons/react/24/solid";
import { isDevelopment } from "@lib/utils";
import { Outlet } from "react-router";

export const AppLayout = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const fetchToken = async () => {
        const token = await getToken({ template: "default" });
        console.log(token);
    };

    return (
        <SidebarLayout
            navbar={
                <Navbar className="bg-slate-100">
                    <NavbarSpacer />
                    <NavbarSection>
                        {/* Show the sign-in button when the user is signed out */}
                        <SignedOut>
                            <SignInButton>
                                <NavbarItem>
                                    <ArrowRightEndOnRectangleIcon />
                                    <NavbarLabel>Sign in</NavbarLabel>
                                </NavbarItem>
                            </SignInButton>
                        </SignedOut>
                        {/* Show the user button when the user is signed in */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
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
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            <SidebarItem href="/" current>
                                <CalendarIcon />
                                <SidebarLabel>Schedule</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                        <SidebarSpacer />
                        <SidebarSection>
                            {isDevelopment() && (
                                <SidebarItem onClick={() => void fetchToken()}>
                                    <CheckBadgeIconSolid />
                                    <SidebarLabel>Fetch Token</SidebarLabel>
                                </SidebarItem>
                            )}
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
