import { fetchFromApi } from "./api-client.server";

export type Stat = {
    id: number;
    count: number;
    icon_url: string;
    stat_name: string;
};

export async function getStats(): Promise<Stat[]> {
    return await fetchFromApi<Stat[]>("home-page-management/stats");
}
