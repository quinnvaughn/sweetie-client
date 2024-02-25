import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const createFreeDateSchema = z.object({
	formError: z.string(),
	draftId: z.string().optional(),
	prepText: z.string(),
	tagText: z.string(),
	thumbnail: z.string().url("Thumbnail must be a valid URL."),
	nsfw: z.enum(["true", "false"]),
	prep: z.array(z.object({ id: z.string(), text: z.string() })),
	tags: z.array(z.object({ id: z.string(), text: z.string() })),
	title: z
		.string()
		.min(5, "Title must be at least 5 characters.")
		.max(500, "Title must be no more than 500 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 5 characters.")
		.max(10000, "Description must be no more than 10,000 characters."),
	recommendedTime: z.string(),
	orderedStops: z
		.array(
			z.object({
				id: z.string().optional(),
				order: z.number().min(1, "Order must be at least 1."),
				optional: z.enum(["true", "false"]),
				options: z
					.array(
						z.object({
							id: z.string().optional(),
							title: z
								.string()
								.min(5, "Title must be at least 5 characters.")
								.max(500, "Title must be no more than 500 characters."),
							content: z
								.string()
								.min(100, "Content must be at least 100 characters.")
								.max(
									100000,
									"Content must be no more than 100,000 characters.",
								),
							optionOrder: z
								.number()
								.min(1, "Option order must be at least 1."),
							location: z.object({
								id: z.string().min(1, "Must have a location ID."),
								name: z.string().min(1, "Must have a location name."),
							}),
						}),
					)
					.min(1, "Must have at least one option."),
				estimatedTime: z.string(),
			}),
		)
		.min(1, "Must have at least one ordered date stop."),
})

export const updateFreeDateSchema = z.object({
	formError: z.string().optional(),
	id: z.string(),
	prepText: z.string().optional(),
	tagText: z.string().optional(),
	thumbnail: z.string().url("Thumbnail must be a valid URL."),
	nsfw: z.enum(["true", "false"]),
	prep: z.array(z.object({ id: z.string(), text: z.string() })),
	tags: z.array(z.object({ id: z.string(), text: z.string() })),
	title: z
		.string()
		.min(5, "Title must be at least 5 characters.")
		.max(500, "Title must be no more than 500 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters.")
		.max(10000, "Description must be no more than 10,000 characters."),
	recommendedTime: z.string(),
	orderedStops: z
		.array(
			z.object({
				id: z.string().optional(),
				order: z.number().min(1, "Order must be at least 1."),
				optional: z.enum(["true", "false"]),
				options: z
					.array(
						z.object({
							id: z.string().optional(),
							title: z
								.string()
								.min(5, "Title must be at least 5 characters.")
								.max(500, "Title must be no more than 500 characters."),
							content: z
								.string()
								.min(100, "Content must be at least 100 characters.")
								.max(
									100000,
									"Content must be no more than 100,000 characters.",
								),
							optionOrder: z
								.number()
								.min(1, "Option order must be at least 1."),
							location: z.object({
								id: z.string().min(1, "Must have a location ID."),
								name: z.string().min(1, "Must have a location name."),
							}),
						}),
					)
					.min(1, "Must have at least one option."),
				estimatedTime: z.string(),
			}),
		)
		.min(1, "Must have at least one ordered date stop."),
})

export type UpdateFreeDateFormValues = z.infer<typeof updateFreeDateSchema>

export type CreateFreeDateFormValues = z.infer<typeof createFreeDateSchema>

export const updateFreeDateResolver = zodResolver(updateFreeDateSchema)

export const createFreeDateResolver = zodResolver(createFreeDateSchema)

export type FreeDateFormValues =
	| CreateFreeDateFormValues
	| UpdateFreeDateFormValues
