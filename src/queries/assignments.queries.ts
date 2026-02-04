import { mapAssignmentResponseToScheduleGridEventAssignment } from "@/lib/domain";
import { queryClient } from "@/lib/queryClient";
import { updateAssignment, type AssignmentResponse, type AssignmentUpdateBody } from "@api/assignments.api";
import { type ScheduleGridResponse } from "@api/schedules.api";
import { useAuth } from "@clerk/react-router";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAssignmentMutation = (assignmentId?: string, scheduleId?: string) => {
    if (!assignmentId || !scheduleId) {
        throw new Error("Assignment ID and schedule ID are required");
    }
    const { getToken } = useAuth();

    return useMutation<AssignmentResponse, Error, AssignmentUpdateBody>({
        mutationFn: async (body: AssignmentUpdateBody) => {
            const token = await getToken({ template: "default" });
            if (!token) throw new Error("No token found");
            return updateAssignment(assignmentId, body, token);
        },
        onSuccess: (data: AssignmentResponse) => {
            // Update the assignment in the schedule grid cache (instead of refetching the entire schedule grid)
            queryClient.setQueryData(["schedule-grid", scheduleId], (old: ScheduleGridResponse) => {
                if (!old) return old;
                return {
                    ...old,
                    events: old.events.map((eventObj) => ({
                        ...eventObj,
                        event_assignments: eventObj.event_assignments
                            ? eventObj.event_assignments.map((assignment) =>
                                  assignment.id === assignmentId
                                      ? mapAssignmentResponseToScheduleGridEventAssignment(data)
                                      : assignment
                              )
                            : []
                    }))
                };
            });
        }
    });
};
