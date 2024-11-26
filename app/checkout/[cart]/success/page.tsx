import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";

export default function Success({ params }: { params: { cart: string } }) {
	return (
		<div className="grid place-content-start text-center justify-center  h-screen gap-8 mt-8">
			<h2 className="text-3xl font-bold">Gracias por tu compra!</h2>
			<p>
				Tu número de orden es{" "}
				<span className="font-bold bg-gray-200 p-2 rounded-md">
					{params.cart}
				</span>
			</p>
			<p>
				Contactate con nosotros al whatsapp y pasa el detalle de tu orden para
				hacer las consultas que tengas
			</p>
			<div>
				<Button className="w-fit" variant="outline">
					Comunicarte al whatsapp
				</Button>
			</div>
		</div>
	);
}
