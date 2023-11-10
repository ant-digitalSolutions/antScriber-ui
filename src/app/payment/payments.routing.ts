import { Routes } from '@angular/router';
import { CheckoutReturnComponent } from './components/checkout-return/checkout-return.component';

export const PaymentsModuleRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'checkout-return',
                component: CheckoutReturnComponent
                
            },
        ],
    }
];