import { getFullAlignmentSegments, getFullAlignmentLength } from '../hsp';
import mockData from '../__mocks__/hspMocks.json';

describe('HSP util tests', () => {
  it('should work with longer query than hit', () => {
    const { longQueryMiddleHit } = mockData;
    const align = getFullAlignmentSegments(longQueryMiddleHit.hsp, 2310, 770);
    expect(align).toEqual(longQueryMiddleHit.result);
  });

  it('should work with shorter query than hit', () => {
    const { shortQueryLongHit } = mockData;
    const align = getFullAlignmentSegments(shortQueryLongHit.hsp, 30, 60);
    expect(align).toEqual(shortQueryLongHit.result);
  });

  it('should get the correct length', () => {
    const { longQueryMiddleHit } = mockData;
    const totalLength = getFullAlignmentLength(
      longQueryMiddleHit.hsp,
      3310,
      770
    );
    expect(totalLength).toBe(3310);
  });
});
