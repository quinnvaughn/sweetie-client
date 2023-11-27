import { useFetcher } from "@remix-run/react"
import { $path } from "remix-routes"
import { Modal, Tab } from "~/features/ui"
import { action, createLocationValidator } from "~/routes/api.create-location"
import { ValidatedForm } from "remix-validated-form"
import { HStack, VStack } from "~/styled-system/jsx"
import { match } from "ts-pattern"
import { useState } from "react"
import { CreateLocationForm, SearchLocationForm } from "~/features/location"

type Props = {
	redirectTo: string
}

export function AddLocation({ redirectTo }: Props) {
	const fetcher = useFetcher<typeof action>()
	const [status, setStatus] = useState<"search" | "create">("search")
	return (
		<ValidatedForm
			validator={createLocationValidator}
			action={$path("/api/create-location")}
			method="post"
			fetcher={fetcher}
		>
			<Modal>
				<Modal.Header title="Add Location" to={$path("/free-date/create")} />
				<Modal.Body>
					<input type="hidden" name="type" value={status} />
					<VStack gap={6}>
						<HStack gap={4}>
							<Tab
								title="Search"
								active={status === "search"}
								onClick={() => setStatus("search")}
							/>
							<Tab
								title="Create"
								active={status === "create"}
								onClick={() => setStatus("create")}
							/>
						</HStack>
						{match(status)
							.with("search", () => (
								<SearchLocationForm redirectTo={redirectTo} />
							))
							.with("create", () => (
								<CreateLocationForm redirectTo={redirectTo} />
							))
							.exhaustive()}
					</VStack>
				</Modal.Body>
				<Modal.Footer button={{ text: "Create location" }} />
			</Modal>
		</ValidatedForm>
	)
}
