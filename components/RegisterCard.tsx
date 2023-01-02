import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import {EventStatus} from "../enums/eventStatus";
import { useRouter } from "next/router";
import vercelPic from "../public/vercel.svg";
import Image from "next/image";


export interface EventDetail {
    eventName: string;
    date: string;
    description: string,
    status: EventStatus,
    page: string,
}

export interface ApplicationPaths {
    application_type: string,
    deadline: string,
    page: string,
}


  export default function Example(props: ApplicationPaths) {
    const router = useRouter();

    function handleClick() {
      router.push(props.page);
    }

    return (
      <>
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
                {props.application_type}
              </Typography>
              <Typography>
                Submissions close on {props.deadline}
              </Typography>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }