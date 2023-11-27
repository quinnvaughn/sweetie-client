import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"
import { Breadcrumbs, PageContainer } from "~/features/ui"
import { AvatarUpload, PersonalInfoField } from "~/features/user"
import { GetViewerInfoDocument } from "~/graphql/generated"
import { gqlFetch } from "~/graphql/graphql"
import { css } from "~/styled-system/css"
import { HStack, VStack } from "~/styled-system/jsx"

export async function loader({ request }: LoaderFunctionArgs) {
	const { data } = await gqlFetch(request, GetViewerInfoDocument)
	if (!data?.viewer) {
		return redirect($path("/login"))
	}
	return json({
		viewer: data.viewer,
	})
}

export default function PersonalInfoRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<PageContainer
			width={{ base: "100%", lg: 1024 }}
			padding={{ base: "40px 20px", lg: "40px 0px" }}
		>
			<Outlet />
			<VStack gap={8} alignItems="flex-start">
				<VStack gap={4} alignItems="flex-start">
					<Breadcrumbs>
						<Breadcrumbs.Link to={$path("/account-settings")} text="Account" />
						<Breadcrumbs.CurrentPage text="Personal Info" />
					</Breadcrumbs>
					<h1
						className={css({
							fontSize: { base: "24px", md: "32px" },
							textStyle: "h1",
						})}
					>
						Personal Info
					</h1>
				</VStack>
				<HStack
					gap={4}
					justifyContent="space-between"
					alignItems={"flex-start"}
					maxWidth={{ base: "auto", md: "400px" }}
					width={"100%"}
				>
					<AvatarUpload value={data.viewer.profile?.avatar ?? undefined} />
					<Link
						className={css({
							borderRadius: "9999px",
							padding: "8px 16px",
							bg: "tertiary",
							color: "black",
							fontWeight: "bold",
						})}
						to={$path("/account-settings/personal-info/edit")}
					>
						Edit Profile
					</Link>
				</HStack>
				<PersonalInfoField label="Name" value={data.viewer.name} />
				<PersonalInfoField label="Email" value={data.viewer.email} />
				<PersonalInfoField label="Username" value={data.viewer.username} />
				<PersonalInfoField
					label="Bio"
					value={data.viewer.profile?.bio ?? "No bio yet"}
				/>
				<PersonalInfoField
					label="Link"
					value={data.viewer.profile?.link ?? "No link yet"}
				/>
			</VStack>
		</PageContainer>
	)
}
