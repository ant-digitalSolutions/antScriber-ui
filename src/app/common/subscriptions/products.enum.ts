import { determineEnvironment } from "src/environments/enviroment.dynamic";

let env = determineEnvironment();
let enumValues;

if (env === 'local') {
  enumValues = {
    Solo: 'prod_OyZtqjmoVGB2Q7',
    Flow: 'prod_OyZuhZGvmn8L0D',
    Horizon: 'dev_Horizon_ID',
    FREE: 'dev_FREE_ID',
  };
} else if (env === 'staging') {
  enumValues = {
    Solo: 'prod_P528v7iGe1vDKM',
    Flow: 'prod_P526bXaILzhuyA',
    Horizon: 'staging_Horizon_ID',
    FREE: 'staging_FREE_ID',
  };
} else {
  enumValues = {
    Solo: 'prod_P528v7iGe1vDKM',
    Flow: 'prod_P526bXaILzhuyA',
    Horizon: 'prod_Horizon_ID',
    FREE: 'prod_FREE_ID',
  };
}

export const ProductsEnum = {
  Solo : enumValues.Solo,
  Flow : enumValues.Flow,
  Horizon : enumValues.Horizon,
  FREE : enumValues.FREE,
}