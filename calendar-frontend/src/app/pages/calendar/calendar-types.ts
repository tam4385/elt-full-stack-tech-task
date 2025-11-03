import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { EltEvent } from "../../common/types";

export type PatchArgsWithName = EventInteractionArgs<EltEvent>;
export type PatchArgsDatesOnly = EventInteractionArgs<EltEvent>;
export type PatchEventArgs = PatchArgsDatesOnly | PatchArgsWithName;