import { use, settings, schema } from "nexus";
import { prisma } from "nexus-plugin-prisma";

use(prisma());

const port = 2904;
settings.change({
	server: {
		port,
	},
});

schema.addToContext(() => ({ prisma }));
