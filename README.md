This repo is for reproducing an error which occurs when using prisma > 2.0.0 and YugaByteDB YSQL.

Steps:

1) run ``yarn install`` in every subfolder (``2.0.0``, ``2.1.3``, ``2.2.0``)
2) adjust the ``prisma/.env`` file in every subfolder (``2.0.0``, ``2.1.3``, ``2.2.0``)
3) run ``yarn setup:prisma`` in every subfolder (``2.0.0``, ``2.1.3``, ``2.2.0``)
4) run ``yarn webpack`` in every subfolder (``2.0.0``, ``2.1.3``, ``2.2.0``)
5) run ``node build/main.js`` in every subfolder (``2.0.0``, ``2.1.3``, ``2.2.0``)

Note that the errors are not occurring in the ``2.0.0`` subfolder.