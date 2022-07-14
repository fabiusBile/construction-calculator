export default function ceilTo2Decimals(n: number): number {
    return Math.round(n * 100) / 100
}