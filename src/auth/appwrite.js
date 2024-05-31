import {Client, Account} from "app-write";

const client = new Client ()
	.setProject('')
	.setEndpoint('http://cloud.appwritte.io/v1')
const account = new Account(client)

export {account, client}