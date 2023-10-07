export interface ICacheService {
    /**
 * Retrieve data from the local-storage
 *
 * @param {string} dataKey
 * @return {*} 
 * @memberof UserService
 */
    getData(dataKey: string): any;

    /**
     * Set data in the cache with the given key.
     *
     * @param {string} key
     * @param {*} data
     * @return {*}  {boolean}
     * @memberof ICacheService
     */
    setData(key: string, data: any): boolean;
}