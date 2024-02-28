import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const signUpForWaitlist = z.object({
	code: z.string().length(6).or(z.literal("")),
})

export type SignUpForWaitlistValues = z.infer<typeof signUpForWaitlist>

export const signUpForWaitlistResolver = zodResolver(signUpForWaitlist)
