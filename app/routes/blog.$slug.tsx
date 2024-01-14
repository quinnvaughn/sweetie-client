import { MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime"
import { DateTime } from "luxon"
import Markdown from "markdown-to-jsx"
import { $params, $path } from "remix-routes"
import { Image, PageContainer } from "~/features/ui"
import { GetBlogPostDocument } from "~/graphql/blog-generated"
import { blogFetch } from "~/graphql/graphql"
import { getEnv } from "~/lib"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

export async function loader({ params }: LoaderFunctionArgs) {
	const { slug } = $params("/blog/:slug", params)
	const { data } = await blogFetch(GetBlogPostDocument, { slug })

	if (!data?.blogPost) {
		throw new Response("Not Found", { status: 404 })
	}

	return json({ blogPost: data.blogPost })
}

const env = getEnv()

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.blogPost) {
		return [{ title: "Not Found", status: 404 }]
	}
	return [
		{ title: data.blogPost.title },
		{ name: "description", content: data.blogPost.description },
		{ property: "og:image", content: data.blogPost.thumbnail.url },
		{ property: "og:title", content: data.blogPost.title },
		{
			property: "og:url",
			content: `${env.FRONTEND_URL}/blog/${data.blogPost.slug}`,
		},
		{ property: "og:description", content: data.blogPost.description },
		{ property: "twitter:card", content: "summary" },
		{ property: "og:type", content: "article" },
		{ property: "twitter:site", content: "@sweetie_dates" },
		{ name: "author", content: "Sweetie" },
		{ property: "og:site_name", content: "Sweetie" },
		{ property: "og:locale", content: "en_US" },
		{
			property: "article:published_time",
			content: DateTime.fromISO(data.blogPost.publishedAt as string).toFormat(
				"yyyy-MM-dd",
			),
		},
		{
			name: "publish_date",
			property: "og:published_date",
			content: DateTime.fromISO(data.blogPost.publishedAt as string).toFormat(
				"yyyy-MM-ddTHH:mm:ssZ",
			),
		},
		{ property: "twitter:creator", content: "@sweetie_dates" },
		{ property: "twitter:title", content: data.blogPost.title },
		{ property: "twitter:description", content: data.blogPost.description },
		{ property: "twitter:image", content: data.blogPost.thumbnail.url },
		{
			property: "twitter:url",
			content: `https://trysweetie.com/blog/${data.blogPost.slug}`,
		},
	]
}

export default function SpecificBlogPostRoute() {
	const { blogPost } = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 700 }}
			padding={{ base: "0px 20px", md: "0px 20px 40px", lg: "0px 0px 40px" }}
		>
			<VStack gap={6} alignItems={"flex-start"} width={"100%"}>
				<Image
					src={blogPost.thumbnail.url}
					alt={blogPost.title}
					css={{
						width: "100%",
						aspectRatio: "16/9",
						objectFit: "cover",
						borderRadius: "8px",
						backgroundColor: "gray",
						maxHeight: "500px",
					}}
				/>
				<h1 className={css({ textStyle: "h1" })}>{blogPost.title}</h1>
				<HStack gap={1} className={css({ fontSize: "12px" })}>
					<p className={css({ textStyle: "paragraph" })}>
						By{" "}
						<Link
							to={$path("/")}
							className={css({
								textDecoration: "underline",
								textStyle: "paragraph",
								fontWeight: "600",
							})}
						>
							Sweetie
						</Link>
					</p>
					<p>·</p>
					<p className={css({ textStyle: "paragraph" })}>
						{DateTime.fromISO(blogPost.publishedAt as string).toFormat(
							"LLLL dd, yyyy",
						)}
					</p>
				</HStack>
				<Markdown
					options={{
						overrides: {
							h2: {
								props: {
									className: css({
										textStyle: "h2",
										paddingBlock: "10px",
									}),
								},
							},
							p: {
								props: {
									className: css({
										textStyle: "paragraph",
										paddingBlock: "10px",
									}),
								},
							},
							a: {
								props: {
									className: css({
										color: "black",
										textDecoration: "underline",
										fontWeight: "bold",
									}),
								},
							},
							img: {
								props: {
									style: {
										borderRadius: "8px",
										aspectRatio: "3/2",
										width: "100%",
										height: "auto",
										objectFit: "cover",
									},
								},
							},
						},
					}}
				>
					{blogPost.content.markdown}
				</Markdown>
			</VStack>
		</PageContainer>
	)
}
