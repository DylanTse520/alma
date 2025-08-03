import { mockLeads } from "@data/mockLeads";
import { Lead } from "@type/leadType";
import { atom } from "jotai";

export const leadsAtom = atom<Lead[]>(mockLeads);
