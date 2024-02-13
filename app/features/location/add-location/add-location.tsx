import { useFetcher, useParams } from "@remix-run/react"
import { Form, useNavigate } from "@remix-run/react"
import { useEffect } from "react"
import { useController, useForm } from "react-hook-form"
import {
	RemixFormProvider,
	useRemixForm,
	useRemixFormContext,
} from "remix-hook-form"
import { $params, $path } from "remix-routes"
import { match } from "ts-pattern"
import { CreateLocationForm, SearchLocationForm } from "~/features/location"
import { Modal, Tab } from "~/features/ui"
import {
	AddLocationValues,
	action,
	addLocationResolver,
} from "~/routes/api.create-location"
import { FreeDateFormValues } from "~/routes/free-date.create"
import { HStack, VStack } from "~/styled-system/jsx"

type Props = {
	redirectTo: string
}

export function AddLocation({ redirectTo }: Props) {
	const fetcher = useFetcher<typeof action>()
	const { control } = useRemixFormContext<FreeDateFormValues>()

	const methods = useRemixForm<AddLocationValues>({
		defaultValues: {
			address: {
				city: "",
				postalCode: "",
				state: "",
				street: "",
			},
			name: "",
			website: "",
			status: "search",
		},
		submitHandlers: {
			onValid: async (data) => {
				const formData = new FormData()
				formData.append("name", data.name)
				formData.append("website", data.website)
				formData.append("address", JSON.stringify(data.address))
				formData.append("status", data.status)
				fetcher.submit(formData, {
					method: "post",
					action: $path("/api/create-location"),
				})
			},
		},
	})
	const params = useParams()
	const { stop, option } = $params(
		"/free-date/create/add-location/:stop/:option",
		params,
	)
	const { field: locationIdField } = useController({
		control,
		name: `orderedStops.${parseInt(stop) - 1}.options.${
			parseInt(option) - 1
		}.location.id`,
	})
	const { field: locationNameField } = useController({
		control,
		name: `orderedStops.${parseInt(stop) - 1}.options.${
			parseInt(option) - 1
		}.location.name`,
	})
	const navigate = useNavigate()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fetcher.data) {
			match(fetcher.data)
				.with({ type: "success" }, ({ id, name }) => {
					locationIdField.onChange(id)
					locationNameField.onChange(name)
					navigate(redirectTo)
				})
				.otherwise(() => {})
		}
	}, [fetcher.data])

	return (
		<Form onSubmit={methods.handleSubmit}>
			<Modal>
				<Modal.Header
					type="link"
					title="Add Location"
					to={$path("/free-date/create")}
				/>
				<Modal.Body>
					<VStack gap={6}>
						<HStack gap={4}>
							<Tab
								title="Search"
								active={methods.getValues().status === "search"}
								onClick={() => methods.setValue("status", "search")}
							/>
							<Tab
								title="Create"
								active={methods.getValues().status === "create"}
								onClick={() => methods.setValue("status", "create")}
							/>
						</HStack>
						<RemixFormProvider {...methods}>
							{match(methods.getValues().status)
								.with("search", () => <SearchLocationForm />)
								.with("create", () => <CreateLocationForm />)
								.exhaustive()}
						</RemixFormProvider>
					</VStack>
				</Modal.Body>
				<Modal.Footer
					button={{
						text: "Create location",
						disabled: fetcher.state === "submitting",
					}}
				/>
			</Modal>
		</Form>
	)
}
