import React from "react";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from "./breadcrumb";

export default function BreadcrumbWrapper({
	items,
}: { items: { url: string; name: string }[] }) {
	return (
		<Breadcrumb className=" mt-8">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Inicio</BreadcrumbLink>
				</BreadcrumbItem>
				{items?.map((item) => (
					<React.Fragment key={item.url}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
