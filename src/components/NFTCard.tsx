import { PublicKey } from "@solana/web3.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getNftMetaData } from "../contexts/utils";

export default function NFTCard(props: {
    mint: string
}) {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const getNFTdetail = async () => {
        const uri = await getNftMetaData(new PublicKey(props.mint))
        await fetch(uri)
            .then(resp =>
                resp.json()
            ).then((json) => {
                setImage(json.image);
                setName(json.name);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getNFTdetail();
        // eslint-disable-next-line
    }, [])

    const cardRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (cardRef.current) {
            setDimensions({
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight
            });
        }
    }, []);
    return (
        <div className="nft-card">
            <div className="nft-card-content">
                <div className="media" ref={cardRef}>
                    {/* eslint-disable-next-line */}
                    <img
                        src={image}
                        style={{ height: dimensions.width }}
                        alt=""
                    />
                    <div className="card-content">
                        <p className="nft-name">{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}