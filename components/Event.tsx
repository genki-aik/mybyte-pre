import React from 'react'
import Image from "next/image";
import vercelPic from "../public/vercel.svg";
import { useRouter } from "next/router";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {EventStatus} from "../enums/eventStatus";


export interface EventDetail {
    eventName: string;
    date: string;
    description: string,
    page: string,
}

export default function Event(props: EventDetail) {
    const router = useRouter();

    function handleClick() {
        router.push(props.page)
    }

    return (
        <div onClick={handleClick}>
        <Card className="w-96">
          <CardHeader color="blue" className="relative h-56">
                <Image
                    src={vercelPic}
                    alt="img-blur-shadow"
                    className="h-full w-full"
                />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h5" className="mb-2">
                    {props.eventName}
                </Typography>
                <Typography>
                    {props.date}
                </Typography>
                <Typography>
                    {props.description}
                </Typography>
            </CardBody>
            <CardFooter divider className="flex items-center justify-between py-3">
                <Typography variant="small">$899/night</Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                Barcelona, Spain
                </Typography>
            </CardFooter>
        </Card>
        </div>
    )
}