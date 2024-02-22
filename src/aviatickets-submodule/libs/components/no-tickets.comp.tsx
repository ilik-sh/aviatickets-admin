import Message from "aviatickets-submodule/libs/components/message.comp";
import { FC } from "react";

interface NoTicketsProps {
  title: string;
  text?: string
}

const NoTickets: FC<NoTicketsProps> = (props) => {
  return <Message {...props} />
}

export default NoTickets;