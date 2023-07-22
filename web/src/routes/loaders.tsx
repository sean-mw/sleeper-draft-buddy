import { LoaderFunctionArgs } from "react-router-dom";

export function draftLoader(args: LoaderFunctionArgs): string {
    return args.params.draftId ?? "";
}