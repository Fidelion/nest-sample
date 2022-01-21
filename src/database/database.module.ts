import { Module, DynamicModule } from '@nestjs/common';
import { createConnection, ConnectionOption } from 'typeorm';

@Module(
//     {
//     providers: [
//         {
//             provide: 'CONNECTION',
//             useValue: createConnection({
//                 type: 'postgres',
//                 host: 'localhost',
//                 port: 5432,
//             }),
//         },
//     ],
// }
)
export class DatabaseModule {
    static register(options: ConnectionOption): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnection(options),
                }
            ]
        }
    }
}
