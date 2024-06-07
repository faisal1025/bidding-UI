import Image from "next/image";
import Bid from "./bid/page";
import Link from "next/link";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is my Bidding Site</h1>
      <Link href='/bid' className="border rounded p-5 border-black">Make a Bid</Link>
    </main>
  );
}
