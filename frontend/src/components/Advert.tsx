import {FaSpotify} from "react-icons/fa";
export default function Advert() {
    return (
        <main className="bg-white rounded-xl w-full h-auto p-5 ">
            <span className="flex flex-row items-center justify-between p-2">
                <span className="flex items-center gap-3 text-gray-600 text-sm"><span>Sponsored </span><FaSpotify className="text-lg text-green-500 " /></span>
                <p className="text-gray-500 text-xs">Advertise your content</p>
            </span>
            <img src="https://firebasestorage.googleapis.com/v0/b/birdy-82061.appspot.com/o/Advert%2Fadvertisement.jpeg?alt=media&token=f3d1f0ef-b6be-4aa0-bf8a-709757dd0c35" className="object-cover rounded-xl w-full h-[26rem]" />
            <span className="p-2 flex items-center justify-between font-serif text-base"><span className="">AFTER HOURS</span> <span className="text-xs">XO Records<sup>&copy;</sup></span></span>
            <p className="text-sm text-gray-500 p-2">Listen to the latest studio album from the weeknd on spotify</p>

        </main >
    )
}
