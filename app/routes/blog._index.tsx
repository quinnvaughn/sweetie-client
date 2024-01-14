import { MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { DateTime } from "luxon"
import { useEffect } from "react"
import { $path } from "remix-routes"
import { Image, PageContainer } from "~/features/ui"
import { AllBlogPostsDocument } from "~/graphql/blog-generated"
import { blogFetch } from "~/graphql/graphql"
import { useTrack } from "~/hooks"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

export async function loader() {
	const { data } = await blogFetch(AllBlogPostsDocument)

	return json(data)
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Sweetie's Love Lounge" },
		{
			name: "description",
			content: "Sweetie's Love Lounge - A blog by Sweetie",
		},
	]
}

export default function BlogsRoute() {
	const { blogPosts } = useLoaderData<typeof loader>()
	const track = useTrack()
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		track("Blog Home Page Viewed", {})
	}, [])
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<VStack gap={6} alignItems={"flex-start"} width={"100%"}>
				<h1 className={css({ textStyle: "h1" })}>Sweetie's Love Lounge</h1>
				<div
					className={css({
						display: "grid",
						gap: 2,
						gridTemplateColumns: {
							base: "1fr",
							md: "repeat(2, 1fr)",
						},
					})}
				>
					{blogPosts.map((post) => (
						<Link
							key={post.title}
							to={$path("/blog/:slug", { slug: post.slug })}
						>
							<VStack gap={2} alignItems={"flex-start"}>
								<Image
									src={post.thumbnail.url}
									alt={post.title}
									css={{
										borderRadius: "8px",
										aspectRatio: "20/19",
										width: "100%",
										objectFit: "cover",
									}}
								/>
								<VStack gap={1} alignItems={"flex-start"} width={"100%"}>
									<h2
										className={css({
											textStyle: "h2",
											fontSize: "20px",
											lineHeight: 1,
										})}
										key={post.title}
									>
										{post.title}
									</h2>
									<p
										className={css({
											textStyle: "paragraph",
											color: "grayText",
										})}
									>
										{DateTime.fromISO(post.publishedAt as string).toFormat(
											"MMMM d, yyyy",
										)}
									</p>
								</VStack>
							</VStack>
						</Link>
					))}
				</div>
			</VStack>
		</PageContainer>
	)
}
