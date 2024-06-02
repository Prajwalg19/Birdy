import {useState} from "react";
import {FaSpotify} from "react-icons/fa";
const advert = [
    {
        imgLink: "https://firebasestorage.googleapis.com/v0/b/birdy-82061.appspot.com/o/Advert%2F4yeo.jpeg?alt=media&token=98cd5a07-f539-48f0-a9f1-2f89f2b85645",
        album: "4 your eyes only",
        description: "Listen to the latest studio album from Jermaine cole on spotify",
        record: "Dreamville"
    },
    {
        imgLink: "https://firebasestorage.googleapis.com/v0/b/birdy-82061.appspot.com/o/Advert%2Fadvertisement.jpeg?alt=media&token=f3d1f0ef-b6be-4aa0-bf8a-709757dd0c35",
        album: "AFTER HOURS",
        description: "Listen to the latest studio album from the weeknd on spotify",
        record: "XO Records"
    },
    {
        imgLink: "https://firebasestorage.googleapis.com/v0/b/birdy-82061.appspot.com/o/Advert%2Fstarboy.jpeg?alt=media&token=f7dd78ab-23a6-4f58-8886-37550deb8c18",
        album: "Starboy",
        description: "Listen to by the weeknd on spotify",
        record: "XO Records"

    },
    {
        imgLink: "https://firebasestorage.googleapis.com/v0/b/birdy-82061.appspot.com/o/Advert%2FRAM.jpeg?alt=media&token=d884be91-b7f1-4e9b-8ecb-9d35c2740fc6",
        album: "Random access memory",
        description: "Listen to the latest studio album by daft punk on spotify",
        record: "Republic records"

    }
] as const
export default function Advert() {
    const [count] = useState(Math.floor(Math.random() * 10) % 4)
    console.log(count)
    return (
        <main className="border dark:border-gray-600 dark:bg-gray-900 text-black dark:text-slate-200 bg-white rounded-xl w-full h-auto p-5 ">
            <span className="flex flex-row items-center justify-between p-2">
                <span className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm"><span>Sponsored </span><FaSpotify className="text-lg text-green-500 " /></span>
                <p className="text-gray-500 dark:text-gray-200 text-xs">Advertise your content</p>
            </span>
            <img src={advert[count].imgLink} className="object-cover rounded-xl w-full h-[26rem]" />

            <span className="p-2 flex items-center justify-between font-serif dark:text-slate-200 text-black text-base"><span className="">{advert[count].album}</span> <span className="text-xs text-white dark:text-slate-400">{advert[count].record}<sup>&copy;</sup></span></span>
            <p className="text-sm text-gray-500 dark:text-gray-400 p-2">{advert[count].description}</p>

        </main >
    )
}
