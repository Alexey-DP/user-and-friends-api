import { IsEnum, IsOptional } from 'class-validator';
import { ORDER_BY, ORDER_TYPE } from '../enum/query.enum';

export class QueryDto {
    constructor(order_by: ORDER_BY | undefined, order_type: ORDER_TYPE | undefined) {
        this.order_by = order_by;
        this.order_type = order_type;
    }

    @IsOptional()
    @IsEnum(ORDER_BY)
    order_by?: ORDER_BY

    @IsOptional()
    @IsEnum(ORDER_TYPE)
    order_type?: ORDER_TYPE
}