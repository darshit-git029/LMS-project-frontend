import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
type Props = {
    videoUrl: string
    title: string
}

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {

    const [vedioData, setVedioData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {
        axios.post("http://localhost:8000/api/v1/getVdoCipherOTP", {
            videoId: videoUrl
        }).then((res) => {  
            setVedioData(res.data)
        })
    }, [videoUrl])
    
    return (
        <div>
            <div style={{ paddingTop: "41%", position: "relative" }}>
                {
                    vedioData.otp && vedioData.playbackInfo !== "" && (
                        <iframe src={`https://player.vdocipher.com/v2/?otp=${vedioData?.otp}&playbackInfo=${vedioData?.playbackInfo}&player=RSFfFBj2mAJbQ4tq`}
                            style={{
                                border:0,
                                maxWidth:"100%",
                                position:"absolute",
                                top:0,
                                left:0,
                                height:"100%",
                                width:"100%"
                            }}
                            allowFullScreen={true}
                            allow="encrypted-media">

                        </iframe>
                    )
                }
            </div>
        </div>
    )
}

export default CoursePlayer