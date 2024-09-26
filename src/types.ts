/**
 * Represents a Cometh entity in the Megaverse.
 */
export type ComethEntity =
  | 'UP_COMETH'
  | 'DOWN_COMETH'
  | 'RIGHT_COMETH'
  | 'LEFT_COMETH';

/**
 * Represents a Soloon entity in the Megaverse.
 */
export type SoloonEntity =
  | 'BLUE_SOLOON'
  | 'RED_SOLOON'
  | 'PURPLE_SOLOON'
  | 'WHITE_SOLOON';
  
/**
 * Represents any entity in the Megaverse.
 */
export type MegaverseEntity =
  | 'SPACE'
  | 'POLYANET'
  | ComethEntity
  | SoloonEntity;

/**
 * Represents the direction a Cometh is facing.
 */
export type ComethDirection = 'up' | 'down' | 'right' | 'left';

/**
 * Represents the color of a Soloon.
 */
export type SoloonColor = 'blue' | 'red' | 'purple' | 'white';

/**
 * Represents a Polyanet object entity with a type identifier.
 */
export type PolyanetObjectEntity = {
    type: 0;
};

/**
 * Represents a Soloon object entity with a type identifier and color.
 */
export type SoloonObjectEntity = {
    type: 1;
    color: SoloonColor;
};

/**
 * Represents a Cometh object entity with a type identifier and direction.
 */
export type ComethObjectEntity = {
    type: 2;
    direction: ComethDirection;
};

/**
 * Represents any object entity in the Megaverse.
 */
export type MegaverseObjectEntity =
    | PolyanetObjectEntity
    | SoloonObjectEntity
    | ComethObjectEntity;
