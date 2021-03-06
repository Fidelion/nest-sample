import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        //do something
        return ['buddy brew', 'nescafe'];
    }
}

@Module({   
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], 
    controllers: [CoffeesController], 
    providers: [
        CoffeesService,
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
        },
        {
            provide: COFFEE_BRANDS,
            useFactory: async(connection: Connection): Promise<string[]> => {
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                console.log('[!] Async factory');
                return coffeeBrands;
            },
            inject: [Connection],
        },
        // {
        //     provide: COFFEE_BRANDS,
        //     useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
        //     inject: [CoffeeBrandsFactory],
        // },
        
        // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']}
    ],
    exports: [CoffeesService]
})
export class CoffeesModule {}
