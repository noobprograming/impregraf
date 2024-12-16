import { InternalService } from "@/app/api/internal";

export default async function Login() {
	const session = await new InternalService().getSession();
	console.log("🚀 ~ Login ~ session:", session);

	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	return <div dangerouslySetInnerHTML={{ __html: session }} />;
}
