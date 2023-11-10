import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { catalogDataEndpoints } from "../apis";

const { CATALOG_PAGE_DATA_API } = catalogDataEndpoints;

// get catalog page data
export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "POST",
            CATALOG_PAGE_DATA_API,
            {
                categoryId
            }
        );

        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};