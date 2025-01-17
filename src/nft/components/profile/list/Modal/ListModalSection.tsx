import { Plural, Trans } from '@lingui/macro'
import Column from 'components/Column'
import { ScrollBarStyles } from 'components/Common'
import Row from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import {
  ChevronUpIcon,
  ListingModalWindowActive,
  ListingModalWindowClosed,
  LoadingIcon,
  VerifiedIcon,
} from 'nft/components/icons'
import { AssetRow, CollectionRow } from 'nft/types'
import { Info } from 'react-feather'
import styled, { useTheme } from 'styled-components/macro'
import { ThemedText } from 'theme'
import { colors } from 'theme/colors'
import { TRANSITION_DURATIONS } from 'theme/styles'

const SectionHeader = styled(Row)`
  justify-content: space-between;
`

const SectionTitle = styled(ThemedText.SubHeader)<{ active: boolean }>`
  line-height: 24px;
  color: ${({ theme, active }) => (active ? theme.textPrimary : theme.textSecondary)};
`

const SectionArrow = styled(ChevronUpIcon)<{ active: boolean }>`
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: ${TRANSITION_DURATIONS.medium}ms;
  transform: rotate(${({ active }) => (active ? 0 : 180)}deg);
`

const SectionBody = styled(Column)`
  border-left: 1.5px solid ${colors.gray650};
  margin-top: 4px;
  margin-left: 7px;
  padding-top: 4px;
  padding-left: 20px;
  max-height: 394px;
  overflow-y: auto;
  ${ScrollBarStyles}
`

const StyledInfoIcon = styled(Info)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.textSecondary};
`

const ContentRowContainer = styled(Column)`
  gap: 8px;
`

const ContentRow = styled(Row)`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  border-radius: 12px;
  opacity: 0.6;
`

const CollectionIcon = styled.img`
  border-radius: 100px;
  height: 24px;
  width: 24px;
  z-index: 1;
`

const AssetIcon = styled.img`
  border-radius: 4px;
  height: 24px;
  width: 24px;
  z-index: 1;
`

const MarketplaceIcon = styled.img`
  border-radius: 4px;
  height: 24px;
  width: 24px;
  margin-left: -4px;
  margin-right: 12px;
`

const ContentName = styled(ThemedText.SubHeaderSmall)`
  color: ${({ theme }) => theme.textPrimary};
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 50%;
`

const StyledVerifiedIcon = styled(VerifiedIcon)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
`

const StyledLoadingIconBackground = styled(LoadingIcon)`
  height: 14px;
  width: 14px;
  stroke: ${({ theme }) => theme.textTertiary};
  margin-left: auto;
  margin-right: 0px;
`

export const enum Section {
  APPROVE,
  SIGN,
}

interface ListModalSectionProps {
  sectionType: Section
  active: boolean
  content: AssetRow[]
  toggleSection: React.DispatchWithoutAction
}

export const ListModalSection = ({ sectionType, active, content, toggleSection }: ListModalSectionProps) => {
  const theme = useTheme()
  const isCollectionApprovalSection = sectionType === Section.APPROVE
  return (
    <Column>
      <SectionHeader>
        <Row>
          {active ? <ListingModalWindowActive /> : <ListingModalWindowClosed />}
          <SectionTitle active={active} marginLeft="12px">
            {isCollectionApprovalSection ? (
              <>
                <Trans>Approve</Trans>&nbsp;{content.length}&nbsp;
                <Plural value={content.length} _1="Collection" other="Collections" />
              </>
            ) : (
              <>
                <Trans>Sign</Trans> &nbsp;{content.length}&nbsp;{' '}
                <Plural value={content.length} _1="Listing" other="Listings" />
              </>
            )}
          </SectionTitle>
        </Row>
        <SectionArrow
          active={active}
          secondaryColor={active ? theme.textPrimary : theme.textSecondary}
          onClick={toggleSection}
        />
      </SectionHeader>
      {active && (
        <SectionBody>
          {isCollectionApprovalSection && (
            <Row height="16px" marginBottom="16px">
              <ThemedText.Caption lineHeight="16px" color="textSecondary">
                <Trans>Why is a transaction required?</Trans>
              </ThemedText.Caption>
              <MouseoverTooltip
                text={<Trans>Listing an NFT requires a one-time marketplace approval for each NFT collection.</Trans>}
              >
                <StyledInfoIcon />
              </MouseoverTooltip>
            </Row>
          )}
          <ContentRowContainer>
            {content.map((row) => {
              return (
                <ContentRow key={row.name}>
                  {isCollectionApprovalSection ? (
                    <CollectionIcon src={row.images[0]} />
                  ) : (
                    <AssetIcon src={row.images[0]} />
                  )}
                  <MarketplaceIcon src={row.images[1]} />
                  <ContentName>{row.name}</ContentName>
                  {isCollectionApprovalSection && (row as CollectionRow).isVerified && <StyledVerifiedIcon />}
                  <StyledLoadingIconBackground />
                </ContentRow>
              )
            })}
          </ContentRowContainer>
        </SectionBody>
      )}
    </Column>
  )
}
