/**
 * A static helper class, responsible for evaluating if the given estimate value is
 * acceptable
 *
 * @class
 * @static
 */
export default class EstimatesService {
    /**
     * Evaluates a given estimate to see if it is within the acceptable range
     *
     * @param {number} estimate : The estimate to evaluate
     * @returns {boolean} Whether or not the given estimate is in the acceptable range
     */
    public static evaluateEstimate(estimate: number): boolean {
        switch(estimate) {
            case 1:
            case 2:
            case 3:
            case 5:
            case 8:
            case 13:
            case 20:
            case 40:
            case 100:
                return true;
            default:
                return false;
        }
    }
}
