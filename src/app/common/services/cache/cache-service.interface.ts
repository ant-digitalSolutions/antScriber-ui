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

    /**
     * Delete the data associated with the given key.
     *
     * @param {string} key
     * @memberof ICacheService
     */
    deleteData(key: string): void;

    /**
     * Clear all data in cache.
     *
     * @memberof ICacheService
     */
    clear(): void;
}