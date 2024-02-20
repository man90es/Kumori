import FKClient from "@bakaso/fkclient"

export default new FKClient(process.env.VUE_APP_API_ENDPOINT.split(",")[0], 1e5)
